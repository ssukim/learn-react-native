import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type TodoItemProps = {
  id: number;
  text: string;
  done: boolean;
};

function TodoItem({id, text, done}: TodoItemProps) {
  return (
    <View style={styles.item}>
      <View style={styles.circle} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
});

export default TodoItem;
