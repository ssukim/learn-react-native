import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';
import LogContext from './contexts/LogContext';

function FeedsScreen() {
  const {logs} = useContext(LogContext);
  console.log(JSON.stringify(logs, null, 2));

  return (
    <View style={styles.block}>
      <FeedList logs={logs} />
      <FloatingWriteButton hidden={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default FeedsScreen;
