import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackParamList, RootTabParamList} from '../RootStack';

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;
type HookNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Detail'>,
  StackNavigationProp<RootStackParamList>
>;

function HomeScreen({navigation}: Props) {
  // useEffect(() => {
  //   console.log('mounted');
  //   return () => {
  //     console.log('unmounted');
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('mounted');
      return () => {
        console.log('unmounted');
      };
    }, []),
  );

  function OpenDetailButton() {
    const hooksNavigation = useNavigation<HookNavigationProps>();

    return (
      <Button
        title="Detail 1 열기"
        onPress={() => hooksNavigation.push('Detail', {id: 1})}
      />
    );
  }

  return (
    <View>
      <Text>Home</Text>
      {/* <Button
        title="Detail 1 열기"
        onPress={() => navigation.navigate('Detail', {id: 1})}
      /> */}
      <OpenDetailButton />
    </View>
  );
}

export default HomeScreen;
