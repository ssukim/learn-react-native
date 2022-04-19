import {DrawerScreenProps} from '@react-navigation/drawer';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootDrawerParamList} from '../RootStack';

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;
function SettingScreen({navigation}: Props) {
  return (
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default SettingScreen;
