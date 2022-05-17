import React from 'react';
import {Image, ImageSourcePropType, ImageStyle} from 'react-native';

type Props = {
  source?: ImageSourcePropType | null;
  size?: number;
  style?: ImageStyle;
};
function Avatar({source, size, style}: Props) {
  return (
    <Image
      source={source || require('../assets/user.png')}
      resizeMode="cover"
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size && size / 2,
        },
      ]}
    />
  );
}

Avatar.defaultProps = {
  size: 32,
};

export default Avatar;
