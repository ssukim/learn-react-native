import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from './contexts/LogContext';
import {
  RootStackWriteNavigationProps,
  RootStackWriteScreenProps,
} from './RootStack';
import {v4 as uuidv4} from 'uuid';

function WriteScreen({route}: RootStackWriteScreenProps) {
  const navigation = useNavigation<RootStackWriteNavigationProps>();

  const log = route.params?.log;

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const {onCreate, onModify, onRemove} = useContext(LogContext);

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        date,
        title,
        body,
      });
    } else {
      onCreate({
        id: uuidv4(),
        title,
        body,
        date: new Date(),
      });
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            if (log?.id) {
              onRemove({id: log.id});
              navigation.pop();
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
