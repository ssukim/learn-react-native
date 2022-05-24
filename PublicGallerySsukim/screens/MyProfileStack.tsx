import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {PostProps} from '../lib/posts';
import MyProfileScreen from './MyProfileScreen';
import PostScreen from './PostScreen';

export type MyProfileStackProps = {
  MyProfile: undefined;
  Post: {
    post: PostProps;
  };
};
const Stack = createNativeStackNavigator<MyProfileStackProps>();

export type MyProfileStackNavigationProps =
  NativeStackNavigationProp<MyProfileStackProps>;

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{title: '게시물'}}
      />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
