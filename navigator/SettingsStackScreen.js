import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../components/settings/Settings';

import Login from '../components/settings/Login';
import HomeSettings from '../components/settings/HomeSettings';
import StatsSettings from '../components/settings/StatsSettings';
import MemoSettings from '../components/settings/MemoSettings';
import AppInfo from '../components/settings/AppInfo';
import OpenSourceInfo from '../components/settings/OpenSourceInfo';

const SettingsStack = createStackNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
      <Settings />
    </View>
  );
}

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      {/* <SettingsStack.Screen name="Details" component={DetailsScreen} /> */}
      <SettingsStack.Screen name="Login" component={Login} />
      <SettingsStack.Screen name="HomeSettings" component={HomeSettings} />
      <SettingsStack.Screen name="StatsSettings" component={StatsSettings} />
      <SettingsStack.Screen name="MemoSettings" component={MemoSettings} />
      <SettingsStack.Screen name="AppInfo" component={AppInfo} />
      <SettingsStack.Screen name="OpenSourceInfo" component={OpenSourceInfo} />
    </SettingsStack.Navigator>
  );
}
