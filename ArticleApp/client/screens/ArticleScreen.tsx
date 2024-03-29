import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getArticle} from '../api/articles';
import {deleteComment, getComments, modifyComment} from '../api/comments';
import {Comment} from '../api/type';
import ArticleView from '../components/ArticleView';
import AskDialog from '../components/AskDialog';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import CommentModal from '../components/CommentModal';
import {useUserState} from '../contexts/UserContext';
import {RootStackParamList} from './types';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [askRemoveComment, setAskRemoveComment] = useState(false);
  const [modifying, setModifying] = useState(false);

  const queryClient = useQueryClient();
  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });
  const {mutate: modify} = useMutation(modifyComment, {
    onSuccess: comment => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments
          ? comments.map(c => (c.id === selectedCommentId ? comment : c))
          : [],
      );
    },
  });

  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;
  const [currentUser] = useUserState();

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets();

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;

  const isMyArticle = currentUser?.id === user.id;

  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };

  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({
      id: selectedCommentId!, // null이 아님을 명시하기 위하여 ! 사용
      articleId: id,
    });
  };

  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };

  const onModify = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModifying(true);
  };

  const onCancelModify = () => {
    setModifying(false);
  };

  const onSubmitModify = (message: string) => {
    setModifying(false);
    modify({
      id: selectedCommentId!,
      articleId: id,
      message,
    });
  };

  const selectedComment = commentsQuery.data.find(
    comment => comment.id === selectedCommentId,
  );

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.published_at}
            username={item.user.username}
            onRemove={onRemove}
            onModify={onModify}
            isMyComment={item.user.id === currentUser?.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <ArticleView
            title={title}
            body={body}
            publishedAt={published_at}
            username={user.username}
            id={id}
            isMyArticle={isMyArticle}
          />
        }
      />
      <CommentInput articleId={id} />
      <AskDialog
        visible={askRemoveComment}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isDestructive
        confirmText="삭제"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
      <CommentModal
        visible={modifying}
        initialMessage={selectedComment?.message}
        onClose={onCancelModify}
        onSubmit={onSubmitModify}
      />
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
