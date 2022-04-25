import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackProps} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

type NavigationProps = StackNavigationProp<RootStackProps, 'Write'>;
type Props = {
  onSave: () => void;
};
function WriteHeader({onSave}: Props) {
  const navigation = useNavigation<NavigationProps>();
  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={styles.block}>
      <View>
        <TransparentCircleButton
          name="arrow-back"
          onPress={onGoBack}
          color={'#424242'}
        />
      </View>
      <View style={styles.buttons}>
        <TransparentCircleButton
          name="delete-forever"
          color={'#ef5350'}
          hasMarginRight
        />
        <TransparentCircleButton
          name="check"
          color={'#009688'}
          onPress={onSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WriteHeader;
