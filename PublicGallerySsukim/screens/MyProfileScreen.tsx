import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import IconRightButton from '../components/IconRightButton';
import {RootStackNavigationProps} from './RootStack';

function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation<RootStackNavigationProps>();

  useEffect(() => {
    navigation.setOptions({
      title: user?.displayName,
      headerRight: () => (
        <IconRightButton
          name="settings"
          onPress={() => navigation.push('Setting')}
        />
      ),
    });
  }, [navigation, user]);

  return user && <Profile userId={user?.id} />;
}

export default MyProfileScreen;
