import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useUserContext} from '../contexts/UserContext';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/user';
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
  const {user, setUser} = useUserContext();

  useEffect(() => {
    // 컴포넌트 첫 로딩 시 로그인 상태를 확인하고 UserContext에 적용
    const unsubscribe = subscribeAuth(
      // 여기에 등록한 함수는 사용자 정보가 바뀔 때마다 호출되는데
      // 처음 호출될 때 바로 unsubscribe해 한 번 호출된후에는 더 이상 호출되지 않게 설정
      async (currentUser: FirebaseFirestoreTypes.DocumentData) => {
        unsubscribe();
        if (!currentUser) {
          return;
        }

        const profile = await getUser(currentUser.uid);
        if (!profile) {
          return;
        }

        setUser(profile);
      },
    );
  }, [user, setUser]);

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
