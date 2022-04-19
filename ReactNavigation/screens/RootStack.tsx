import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  HeaderlessScreen: undefined;
  Detail: {id: number};
  Main: {id: number};
};

export type RootDrawerParamList = {
  Home: undefined;
  Setting: undefined;
};

export type RootTabParamList = {
  Home: {id: number};
  Message: undefined;
  Notification: undefined;
  Search: undefined;
  Detail: NavigatorScreenParams<Pick<RootStackParamList, 'Detail'>>;
};
