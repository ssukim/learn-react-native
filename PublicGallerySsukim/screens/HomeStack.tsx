import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from './FeedScreen';
import ProfileScreen from './ProfileScreen';

export type HomeStackProps = {
  Feed: undefined;
  Profile: {
    userId: string;
    displayName: string;
  };
};
const Stack = createNativeStackNavigator<HomeStackProps>();

export type HomeStackNavigationProps =
  NativeStackNavigationProp<HomeStackProps>;

export type HomeStackProfileRouteProps = RouteProp<HomeStackProps, 'Profile'>;

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
