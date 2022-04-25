import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';

export type RootStackWriteNavigationProps = StackNavigationProp<
  RootStackProps,
  'Write'
>;
export type RootStackProps = {
  MainTab: undefined;
  Write: undefined;
  FeedScreen: {
    log: {
      title: string;
      body: string;
      date: Date;
    };
  };
};

const Stack = createStackNavigator<RootStackProps>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Write" component={WriteScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
