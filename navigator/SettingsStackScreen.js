import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../components/Settings';

import OpenSourceInfo from '../components/OpenSourceInfo';

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
      <SettingsStack.Screen name="OpenSourceInfo" component={OpenSourceInfo} />
    </SettingsStack.Navigator>
  );
}
