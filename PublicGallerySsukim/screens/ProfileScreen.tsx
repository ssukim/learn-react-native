import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Profile from '../components/Profile';
import {
  HomeStackNavigationProps,
  HomeStackProfileRouteProps,
} from './HomeStack';

function ProfileScreen() {
  const route = useRoute<HomeStackProfileRouteProps>();
  const navigation = useNavigation<HomeStackNavigationProps>();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
