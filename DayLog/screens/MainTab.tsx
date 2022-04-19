import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
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
    <Tab.Navigator>
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default MainTab;
