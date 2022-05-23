import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';

function FeedScreen() {
  const {posts, noMorePost, refreashing, onLoadMore, onRefresh} = usePosts();

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost ? (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
        ) : null
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreashing} />
      }
    />
  );
}

const renderItem = ({item}: FirebaseFirestoreTypes.DocumentData) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
export default FeedScreen;
