import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogContext from './contexts/LogContext';
import {RootStackWriteNavigationProps} from './RootStack';
import {v4 as uuidv4} from 'uuid';

function WriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigation = useNavigation<RootStackWriteNavigationProps>();

  const {onCreate} = useContext(LogContext);
  const onSave = () => {
    onCreate({
      id: uuidv4(),
      title,
      body,
      // 날짜를 문자열로 변환
      date: new Date(),
    });
    navigation.pop();
  };
  return (
    <View style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} />
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
