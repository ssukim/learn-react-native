import React from 'react';
import {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LogContext from './contexts/LogContext';

function CalendarScreen() {
  const {logs} = useContext(LogContext);

  return (
    <View style={styles.block}>
      {/* <Text style={styles.text}>text: {logs}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  text: {
    padding: 16,
    fontSize: 24,
  },
});

export default CalendarScreen;
