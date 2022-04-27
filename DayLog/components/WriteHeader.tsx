import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RootStackWriteNavigationProps} from '../screens/RootStack';
import TransparentCircleButton from './TransparentCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
  onSave: () => void;
  onAskRemove: () => void;
  isEditing: boolean;
  date: Date;
  onChangeDate: React.Dispatch<React.SetStateAction<Date>>;
};
function WriteHeader({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: Props) {
  const navigation = useNavigation<RootStackWriteNavigationProps>();
  const onGoBack = () => {
    navigation.pop();
  };

  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [visible, setVisible] = useState(false);

  const onPressDate = () => {
    setMode('date');
    setVisible(true);
  };

  const onPressTime = () => {
    setMode('time');
    setVisible(true);
  };

  const onConfirm = (selectedDate: Date) => {
    setVisible(false);
    onChangeDate(selectedDate);
  };

  const onCancel = () => {
    setVisible(false);
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
      <View style={styles.center}>
        <Pressable onPress={onPressDate}>
          <Text>{format(new Date(date), 'PPP', {locale: ko})}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={onPressTime}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        date={date}
      />
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
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
