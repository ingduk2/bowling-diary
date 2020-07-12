import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { navigationRef } from './navi/RootNavigation';

import HomeStackScreen from './navigator/HomeStackScreen';
import StatsStackScreen from './navigator/StatsStackScreen';
import MemosStackScreen from './navigator/MemosStackScreen';
// eslint-disable-next-line import/no-cycle
import SettingsStackScreen from './navigator/SettingsStackScreen';
import MemoThemeContext from './context/MemoThemeContext';

export const MemoSettingContext = React.createContext({});

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [memoContext, setMemoContext] = useState({});

  console.log('====APP====', isReady, memoContext);
  // eslint-disable-next-line no-use-before-define

  useEffect(() => {
    console.log('useEffect', memoContext);
    const newMemoContext = {
      // ...memoContext,
      theme: 'bright',
      // eslint-disable-next-line no-use-before-define
      changeTheme,
    };
    console.log(newMemoContext);
    setMemoContext(newMemoContext);
    console.log('useEffect', memoContext);
  }, []);

  const changeTheme = () => {
    console.log('=========changeThemeFunc========', isReady, memoContext);
    const isBright = memoContext.theme === 'bright';
    const nextTheme = isBright ? 'dark' : 'bright';
    setMemoContext((prevState) => {
      return {
        ...prevState,
        theme: prevState.theme === 'bright' ? 'dark' : 'bright',
      };
    });
  };
  // console.log('-----------------------------------');
  // changeTheme();
  // if (memoContext.changeTheme !== undefined) {
  //   memoContext.changeTheme();
  // }
  // console.log('-----------------------------------');

  const cacheResourceAsync = async () => {
    await new Promise((r) => setTimeout(r, 1500));

    const images = [
      // eslint-disable-next-line global-require
      require('./assets/gorilla.png'),
      // eslint-disable-next-line global-require
      require('./assets/icon.png'),
      // eslint-disable-next-line global-require
      require('./assets/splash.png'),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  if (isReady) {
    return (
      <MemoSettingContext.Provider value={memoContext}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color }) => {
                let iconTag;
                if (route.name === 'Home') {
                  iconTag = focused ? (
                    <Ionicons name="md-home" size={40} color={color} />
                  ) : (
                    <Ionicons name="md-home" size={40} color={color} />
                  );
                } else if (route.name === 'Settings') {
                  // iconName = focused ? 'ios-list-box' : 'ios-list';
                  iconTag = <Ionicons name="ios-list" size={40} color={color} />;
                } else if (route.name === 'Stats') {
                  iconTag = <Ionicons name="md-stats" size={40} color={color} />;
                } else if (route.name === 'Memos') {
                  iconTag = <FontAwesome name="sticky-note-o" size={40} color={color} />;
                }
                return iconTag;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Stats" component={StatsStackScreen} options={{ title: 'Stats' }} />
            <Tab.Screen name="Memos" component={MemosStackScreen} options={{ title: 'Memos' }} />
            <Tab.Screen
              name="Settings"
              component={SettingsStackScreen}
              options={{ title: 'Settings' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </MemoSettingContext.Provider>
    );
  }
  return (
    <AppLoading
      startAsync={cacheResourceAsync}
      onFinish={() => setIsReady(true)}
      // eslint-disable-next-line no-console
      onError={console.warn}
    />
  );
}
