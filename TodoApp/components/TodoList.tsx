import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoItem, {TodoItemProps} from './TodoItem';

export type TodoListProps = {
  todos: TodoItemProps[];
};
function TodoList({todos}: TodoListProps) {
  return (
    <FlatList
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem id={item.id} text={item.text} done={item.done} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default TodoList;
