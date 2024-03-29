import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

function DetailScreen({route, navigation}: Props) {
  useEffect(() => {
    navigation.setOptions({
      title: `상세 정보 - ${route.params.id}`,
    });
  }, [navigation, route.params.id]);

  function IDText() {
    const hooksRoute = useRoute<DetailScreenRouteProp>();
    return <Text style={styles.text}>id: {hooksRoute.params.id}</Text>;
  }

  return (
    <View style={styles.block}>
      <IDText />
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
