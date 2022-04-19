import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootTabParamList} from '../RootStack';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;
function HomeScreen({navigation}: Props) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Detail 1 열기"
        onPress={() => navigation.navigate('Detail', {id: 1})}
      />
    </View>
  );
}

export default HomeScreen;
