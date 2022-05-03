import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FeedScreen from './FeedScreen';

export type HomeStackProps = {
  Feed: undefined;
};
const Stack = createNativeStackNavigator<HomeStackProps>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
