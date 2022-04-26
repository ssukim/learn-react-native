import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackWriteNavigationProps} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';

type Props = {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
};
function WriteHeader({onSave, onAskRemove, isEditing}: Props) {
  const navigation = useNavigation<RootStackWriteNavigationProps>();
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
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color={'#ef5350'}
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
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
