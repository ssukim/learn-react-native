import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthResult} from '../api/type';

const key = 'auth';

const authStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key);
    if (!rawData) {
      return null;
    }
    try {
      const data: AuthResult = JSON.parse(rawData);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  set(authResult: AuthResult) {
    return AsyncStorage.setItem(key, JSON.stringify(authResult));
  },
  clear() {
    return AsyncStorage.removeItem(key);
  },
};

export default authStorage;
