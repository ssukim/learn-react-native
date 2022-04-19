import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LogContext from './contexts/LogContext';

function FeedsScreen() {
  const {text, setText} = useContext(LogContext);

  return (
    <View style={styles.block}>
      {/* <LogContext.Consumer>{value => <Text>{value}</Text>}</LogContext.Consumer> */}
      {/* <Text>{value}</Text> */}
      <TextInput value={text} onChangeText={setText} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  input: {
    padding: 16,
    backgroundColor: 'white',
  },
});

export default FeedsScreen;
