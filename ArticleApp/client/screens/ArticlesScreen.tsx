import React, {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {Article} from '../api/type';
import Articles from '../components/Articles';
import {useUserState} from '../contexts/UserContext';

function ArticlesScreen() {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.length === 10
          ? {cursor: lastPage[lastPage.length - 1].id}
          : undefined,
      getPreviousPageParam: (_, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }
        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as Article[]).concat(...data.pages);
  }, [data]);
  // console.log('🚀 ~ file: ArticlesScreen.tsx ~ line 42 ~ items ~ items', items);

  const [user] = useUserState();

  if (!items) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }
  return (
    <Articles
      articles={items}
      showWriteButton={!!user}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refresh={fetchPreviousPage}
      isRefreshing={isFetchingPreviousPage}
    />
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
