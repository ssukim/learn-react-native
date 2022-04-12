import AsyncStorage from '@react-native-community/async-storage';
import {TodoListProps} from '../components/TodoList';

const key = 'locTodos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem('locTodos');
      if (rawTodos) {
        const savedTodos = JSON.parse(rawTodos);

        return savedTodos;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async set(data: TodoListProps) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },
};

export default todosStorage;
