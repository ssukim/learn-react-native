import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import MainTab from './MainTab';
import WriteScreen from './WriteScreen';

type Props = {
  MainTab: undefined;
  Write: undefined;
};
const Stack = createStackNavigator<Props>();

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
