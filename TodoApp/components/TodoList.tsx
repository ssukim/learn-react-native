import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoItem, {TodoItemProps} from './TodoItem';

export type TodoListProps = {
  todos: TodoItemProps[];
  onToggle?: (id: number) => void;
  onRemove?: (id: number) => void;
};

function TodoList({todos, onToggle, onRemove}: TodoListProps) {
  return (
    <FlatList
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default TodoList;
