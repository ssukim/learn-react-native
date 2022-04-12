import React, {useEffect, useState} from 'react';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import {KeyboardAvoidingView, StyleSheet, Platform} from 'react-native';
import TodoList, {TodoListProps} from './components/TodoList';
import todosStorage from './storages/todosStorage';

const App = () => {
  const today = new Date();

  const [locTodos, setTodos] = useState<TodoListProps>({
    todos: [
      {id: 1, text: '작업환경 설정', done: true},
      {id: 2, text: '리액트 네이티브 기초 공부', done: false},
      {id: 3, text: '투두리스트 만들어보기', done: false},
    ],
  });

  const onInsert = (text: string) => {
    const nextId =
      locTodos.todos.length > 0
        ? Math.max(...locTodos.todos.map(item => item.id)) + 1
        : 1;

    const todo = {
      id: nextId,
      text,
      done: false,
    };

    const todos = locTodos.todos.concat(todo);
    setTodos({
      todos,
    });
  };

  const onToggle = (id: number) => {
    const nextTodos = locTodos.todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos({
      todos: nextTodos,
    });
  };

  const onRemove = (id: number) => {
    const nextTodos = locTodos.todos.filter(todo => todo.id !== id);
    setTodos({
      todos: nextTodos,
    });
  };

  // // 불러오기
  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  // 저장하기
  useEffect(() => {
    todosStorage.set(locTodos).catch(console.error);
  }, [locTodos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          <DateHead date={today} />
          {locTodos?.todos.length === 0 ? (
            <Empty />
          ) : (
            <TodoList
              todos={locTodos.todos}
              onToggle={id => onToggle(id)}
              onRemove={id => onRemove(id)}
            />
          )}
          <AddTodo onInsert={text => onInsert(text)} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});
export default App;
