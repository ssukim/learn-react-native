import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import usePosts from '../hooks/usePosts';
import {PostProps} from '../lib/posts';
import {getUser, UserProps} from '../lib/user';
import Avatar from './Avartar';
import PostGridItem from './PostGridItem';

type Props = {
  userId: string;
};
function Profile({userId}: Props) {
  const [user, setUser] = useState<UserProps>();
  const {posts, noMorePost, refreashing, onLoadMore, onRefresh} = usePosts();

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={({item}) => renderItem(item)}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar
            source={user.photoURL ? {uri: user.photoURL} : null}
            size={128}
          />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
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

const renderItem = (item: PostProps) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});

export default Profile;
