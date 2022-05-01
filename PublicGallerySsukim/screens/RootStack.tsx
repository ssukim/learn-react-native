import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './MainTab';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';

export type RootStackProps = {
  SignIn: {
    isSignUp?: boolean;
  };
  Welcome: {
    uid: string;
  };
  MainTab: undefined;
};

export type RootStackNavigationProps =
  NativeStackNavigationProp<RootStackProps>;

export type RootStackSignInScreenProps = NativeStackScreenProps<
  RootStackProps,
  'SignIn'
>;

export type RootStackWelcomeScreenProps = NativeStackScreenProps<
  RootStackProps,
  'Welcome'
>;

export type RootStackWelcomeRouteProps = RouteProp<RootStackProps, 'Welcome'>;

const Stack = createNativeStackNavigator<RootStackProps>();

function RootStack() {
  const {user} = useUserContext();
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
