import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/stack/HomeScreen';
import DrawerHomeScreen from './screens/drawer/HomeScreen';
import DetailScreen from './screens/stack/DetailScreen';
import HeaderlessScreen from './screens/stack/HeaderlessScreen';
import {RootDrawerParamList, RootStackParamList} from './screens/RootStack';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingScreen from './screens/drawer/SettingScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function App() {
  return (
    <NavigationContainer>
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
      <Drawer.Navigator
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
