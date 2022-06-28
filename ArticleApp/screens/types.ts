import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

/** MainTab */
export type MainTabParamList = {
  Articles: undefined;
};
export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProps = RouteProp<RootStackParamList, 'MainTab'>;

/** RootStack */
export type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
