import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {applyToken} from '../api/client';
import {AuthError} from '../api/type';
import {useUserState} from '../contexts/UserContext';
import {RootStackNavigationProp} from '../screens/types';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

export default function useLogin() {
  const inform = useInform();
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();

  const mutation = useMutation(login, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop();
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      const message =
        error.response?.data.data?.[0]?.messages[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
  return mutation;
}
