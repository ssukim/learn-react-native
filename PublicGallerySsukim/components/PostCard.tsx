import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUserContext} from '../contexts/UserContext';
import usePostActions from '../hooks/usePostActions';
import {UserProps} from '../lib/user';
import {HomeStackNavigationProps} from '../screens/HomeStack';
import {MyProfileStackNavigationProps} from '../screens/MyProfileStack';
import ActionSheetModal from './ActionSheetModal';
import Avatar from './Avartar';

type Props = {
  user: UserProps;
  photoURL: string;
  description: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  id: string;
};
function PostCard({user, photoURL, description, createdAt, id}: Props) {
  const routeNames = useNavigationState(state => state.routeNames);

  const homeNavigation = useNavigation<HomeStackNavigationProps>();
  const myProfileNavigation = useNavigation<MyProfileStackNavigationProps>();

  const date = useMemo(
    () => (createdAt ? new Date(createdAt.seconds * 1000) : new Date()),
    [createdAt],
  );

  const {user: me} = useUserContext();
  const isMyPost = me?.id === user.id;

  const onOpenProfile = () => {
    // MyProfile이 존재하는지 확인
    if (routeNames.find(routeName => routeName === 'MyProfile')) {
      myProfileNavigation.navigate('MyProfile');
    } else {
      homeNavigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  const {isSelecting, onPressMore, onClose, actions} = usePostActions({
    id,
    description,
  });

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Avatar
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/user.png')
            }
          />
          <Text>{user.displayName}</Text>
        </Pressable>
        {isMyPost && (
          <Pressable hitSlop={8} onPress={onPressMore}>
            <Icon name="more-vert" size={20} />
          </Pressable>
        )}
      </View>
      <Image
        source={{uri: photoURL}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.paddingBlock}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date.toLocaleString()}</Text>
      </View>
      {/* for android */}
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },

  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
