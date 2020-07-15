import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { navigationRef } from './navi/RootNavigation';

import HomeStackScreen from './navigator/HomeStackScreen';
import StatsStackScreen from './navigator/StatsStackScreen';
import MemosStackScreen from './navigator/MemosStackScreen';
import SettingsStackScreen from './navigator/SettingsStackScreen';
import MemoThemeProvider from './context/MemoThemeProvider';
import StatsThemeProvider from './context/StatsThemeProvider';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

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
      <MemoThemeProvider>
        <StatsThemeProvider>
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
                keyboardHidesTabBar: true,
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
        </StatsThemeProvider>
      </MemoThemeProvider>
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
