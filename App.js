import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform, AsyncStorage , Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome,  Ionicons, Feather, AntDesign} from '@expo/vector-icons'; 

import { navigationRef } from './navi/RootNavigation';
import {AppLoading} from 'expo';
import { Asset } from 'expo-asset';

import {HomeStackScreen} from './navigator/HomeStackScreen';
import {StatsStackScreen} from './navigator/StatsStackScreen';
import {MemosStackScreen} from './navigator/MemosStackScreen';
import {SettingsStackScreen} from './navigator/SettingsStackScreen';




const { height, width } = Dimensions.get("window");


const Tab = createBottomTabNavigator();


export default function App() {
  const [isReady , setIsReady] = useState(false);

  const _cacheResourceAsync = async () => {
    await new Promise(r => setTimeout(r, 1500));

    const images = [
      require('./assets/gorilla.png'),
      require('./assets/icon.png'),
      require('./assets/splash.png')
    ]
    const cacheImages = images.map(image =>{
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  if (isReady){
    return (
      <NavigationContainer ref = {navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconTag;
            if (route.name === 'Home') {
              iconTag = focused ? 
              <Ionicons name='md-home' size={40} color={color} /> :
              <Ionicons name="md-home" size={40} color={color} /> ;

            } else if (route.name === 'Settings') {
              // iconName = focused ? 'ios-list-box' : 'ios-list';
              iconTag = <Ionicons name='ios-list' size={40} color={color} />
            } else if (route.name == 'Stats'){
              iconTag = <Ionicons name="md-stats" size={40} color={color} />
            } else if (route.name == 'Memos'){
              iconTag = <FontAwesome name="sticky-note-o" size={40} color={color} />
            }
            return iconTag;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home'}}/>
        <Tab.Screen name="Stats"  component={StatsStackScreen} options={{title: 'Stats'}} />
        <Tab.Screen name="Memos" component={MemosStackScreen} options={{title: 'Memos'}}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ title: 'Settings' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  } else {
    return (
      <AppLoading
        startAsync={_cacheResourceAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );  
  }

  
}
