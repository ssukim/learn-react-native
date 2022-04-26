import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';
import CalendarScreen from './CalendarScreen';
import FeedsScreen from './FeedsScreen';
import SearchScreen from './SearchScreen';

type Props = {
  Calendar: undefined;
  Feeds: undefined;
  Search: undefined;
};
const Tab = createBottomTabNavigator<Props>();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#009688',
      })}>
      <Tab.Screen
        name="Feeds"
        component={FeedsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-stream" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '검색',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" size={size} color={color} />
          ),
          headerTitle: () => <SearchHeader />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
