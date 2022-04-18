import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Detail: {id: number};
};

export type RootProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
