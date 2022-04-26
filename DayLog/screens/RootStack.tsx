import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import {LogBox} from 'react-native';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export type RootStackWriteNavigationProps = StackNavigationProp<
  RootStackProps,
  'Write'
>;
export type RootStackWriteScreenProps = NativeStackScreenProps<
  RootStackProps,
  'Write'
>;

export type RootStackProps = {
  MainTab: undefined;
  Write:
    | {
        log: {
          id: string;
          title: string;
          body: string;
          date: Date;
        };
      }
    | undefined;
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
