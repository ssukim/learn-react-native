import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

function DetailScreen({route, navigation}: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>id: {route.params?.id}</Text>
      <View style={styles.buttons}>
        <Button
          title="다음"
          onPress={() => navigation.push('Detail', {id: route.params.id + 1})}
          //   onPress={() =>
          //     navigation.navigate('Detail', {id: route.params.id + 1})
          //   }
        />
        <Button title="뒤로가기" onPress={() => navigation.pop()} />
        <Button title="처음으로" onPress={() => navigation.popToTop()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  },
  buttons: {
    flexDirection: 'row',
  },
});
export default DetailScreen;
