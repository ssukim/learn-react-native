import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, StyleSheet} from 'react-native';
import {HomeStackNavigationProps, HomeStackPostRouteProps} from './HomeStack';
import PostCard from '../components/PostCard';
import {UpdatePostProps} from '../lib/posts';
import {MyProfileStackNavigationProps} from './MyProfileStack';
import events from '../lib/event';

function PostScreen() {
  const route = useRoute<HomeStackPostRouteProps>();
  const navigation = useNavigation<
    HomeStackNavigationProps | MyProfileStackNavigationProps
  >();

  const {post} = route.params;

  useEffect(() => {
    const handler = ({description}: Pick<UpdatePostProps, 'description'>) => {
      navigation.setParams({post: {...post, description}});
    };

    events.addListener('updatePost', handler);
    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [post, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createdAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  contentContainer: {
    paddingBottom: 40,
  },
});

export default PostScreen;
