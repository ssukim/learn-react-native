import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
    });
  }, [navigation, user]);

  return user && <Profile userId={user?.id} />;
}

export default MyProfileScreen;
