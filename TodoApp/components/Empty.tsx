import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

function Empty() {
  return (
    <View style={styles.block}>
      <Image source={require('../assets/images/circle.png')} />
      <Text style={styles.description}>할일이 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 24,
    color: '#9e9e9e',
  },
});
export default Empty;
