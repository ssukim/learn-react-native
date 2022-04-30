import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import SignInScreen from './SignInScreen';

export type RootStackProps = {
  SignIn: {
    isSignUp?: boolean;
  };
};

export type RootStackSignInNavigationProps = NativeStackNavigationProp<
  RootStackProps,
  'SignIn'
>;

export type RootStackSignInScreenProps = NativeStackScreenProps<
  RootStackProps,
  'SignIn'
>;

const Stack = createNativeStackNavigator<RootStackProps>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
