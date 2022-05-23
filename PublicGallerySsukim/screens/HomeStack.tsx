import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {PostProps} from '../lib/posts';
import FeedScreen from './FeedScreen';
import PostScreen from './PostScreen';
import ProfileScreen from './ProfileScreen';

export type HomeStackProps = {
  Feed: undefined;
  Profile: {
    userId: string;
    displayName: string;
  };
  Post: {
    post: PostProps;
  };
};
const Stack = createNativeStackNavigator<HomeStackProps>();

export type HomeStackNavigationProps =
  NativeStackNavigationProp<HomeStackProps>;

export type HomeStackProfileRouteProps = RouteProp<HomeStackProps, 'Profile'>;
export type HomeStackPostRouteProps = RouteProp<HomeStackProps, 'Post'>;

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
