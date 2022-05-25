import {useCallback, useEffect, useState} from 'react';
import {useUserContext} from '../contexts/UserContext';
import {
  getNewerPosts,
  getOlderPosts,
  getPosts,
  PAGE_SIZE,
  PostProps,
  UpdatePostProps,
} from '../lib/posts';
import usePostsEventEffect from './usePostEventEffect';

export default function usePosts(userId?: string) {
  const [posts, setPosts] = useState<PostProps[]>();
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreashing, setRefreashing] = useState(false);
  const {user} = useUserContext();

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, userId);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = useCallback(async () => {
    if (!posts || posts.length === 0 || refreashing) {
      return;
    }
    const firstPost = posts[0];
    setRefreashing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreashing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  }, [posts, userId, refreashing]);

  useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  const removePost = useCallback(
    (postId: string) => {
      setPosts(posts?.filter(post => post.id !== postId));
    },
    [posts],
  );

  const updatePost = useCallback(
    ({id: postId, description}: UpdatePostProps) => {
      // id가 일치하는 포스트를 찾아서 description 변경
      const nextPosts = posts?.map(post =>
        post.id === postId ? {...post, description} : post,
      );
      setPosts(nextPosts);
    },
    [posts],
  );

  usePostsEventEffect({
    refresh: onRefresh,
    removePost,
    updatePost,
    enabled: !userId || userId === user?.id,
  });

  return {
    posts,
    noMorePost,
    refreashing,
    onLoadMore,
    onRefresh,
    removePost,
    updatePost,
  };
}
