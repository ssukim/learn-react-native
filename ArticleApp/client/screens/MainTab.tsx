import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import ArticlesScreen from './ArticlesScreen';
import {MainTabParamList} from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          title: '게시글 목록',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainTab;
