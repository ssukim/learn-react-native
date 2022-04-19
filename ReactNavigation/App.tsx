import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/stack/HomeScreen';
import TabHomeScreen from './screens/tab/HomeScreen';
import MessageScreen from './screens/tab/MessageScreen';
import NotificationScreen from './screens/tab/NotificationScreen';
import SearchScreen from './screens/tab/SearchScreen';
import DrawerHomeScreen from './screens/drawer/HomeScreen';
import DetailScreen from './screens/stack/DetailScreen';
import HeaderlessScreen from './screens/stack/HeaderlessScreen';
import {
  RootDrawerParamList,
  RootStackParamList,
  RootTabParamList,
} from './screens/RootStack';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingScreen from './screens/drawer/SettingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MainScreen from './screens/tab/MainScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function App() {
  return (
    <NavigationContainer>
      {/* StackNavigator Start */}
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '홈',
            // Header 블록에 대한 스타일
            headerStyle: {
              backgroundColor: '#29b6f6',
            },
            // Header의 텍스트, 버튼들 색상
            headerTintColor: '#ffffff',
            // 타이틀 텍스트의 스타일
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerBackVisible: false,
            headerLeft: ({onPress}: any) => (
              <TouchableOpacity onPress={onPress}>
                <Text>Left</Text>
              </TouchableOpacity>
            ),
            headerTitle: ({children}) => (
              <View>
                <Text>{children}</Text>
              </View>
            ),
            headerRight: () => (
              <View>
                <Text>Right</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="HeaderlessScreen"
          component={HeaderlessScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator> */}
      {/* StackNavigator End */}

      {/* DrawerNavigator Start */}
      {/* <Drawer.Navigator
        initialRouteName="Home"
        backBehavior="history"
        drawerContent={({navigation}) => (
          <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button
              onPress={() => navigation.closeDrawer()}
              title="Drawer 닫기"
            />
          </SafeAreaView>
        )}
        screenOptions={{
          drawerPosition: 'left',
          drawerActiveBackgroundColor: '#fb8c00',
          drawerActiveTintColor: 'white',
        }}>
        <Drawer.Screen
          name="Home"
          component={DrawerHomeScreen}
          options={{title: '홈', headerLeft: () => <Text>Left</Text>}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
      </Drawer.Navigator> */}
      {/* DrawerNavigator End */}

      {/* TabNavigator Start */}
      {/* <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}>
        <Tab.Screen
          name="Home"
          component={TabHomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: '검색',
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: '알림',
            tabBarIcon: ({color, size}) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            title: '메시지',
            tabBarIcon: ({color, size}) => (
              <Icon name="message" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator> */}
      {/* TabNavigator End */}
      {/* StackNavigator With TabNavigator Start */}
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
      {/* StackNavigator With TabNavigator End */}
    </NavigationContainer>
  );
}

export default App;
