import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import {RootDrawerParamList} from '../RootStack';

type Props = DrawerScreenProps<RootDrawerParamList, 'Home'>;
function HomeScreen({navigation}: Props) {
  useEffect(() => {
    navigation.setOptions({title: '홈'});
  }, [navigation]);
  return (
    <View>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="setting 열기"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

export default HomeScreen;
