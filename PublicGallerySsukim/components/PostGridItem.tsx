import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {PostProps} from '../lib/posts';
import {HomeStackNavigationProps} from '../screens/HomeStack';

type Props = {
  post: PostProps;
};
function PostGridItem({post}: Props) {
  const dimensions = useWindowDimensions();
  const size = (dimensions.width - 3) / 3;
  const navigation = useNavigation<HomeStackNavigationProps>();

  const onPress = () => {
    navigation.navigate('Post', {post});
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.6 : 1,
          width: size,
          height: size,
        },
        styles.block,
      ]}>
      <Image
        style={styles.image}
        source={{uri: post.photoURL}}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {margin: 0.5},
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    height: '100%',
  },
});

export default PostGridItem;
