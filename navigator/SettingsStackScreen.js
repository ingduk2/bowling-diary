import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform, AsyncStorage} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../components/Settings';

import OpenSourceInfo from '../components/OpenSourceInfo';

const SettingsStack = createStackNavigator();

export function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        {/* <SettingsStack.Screen name="Details" component={DetailsScreen} /> */}
        <SettingsStack.Screen name="OpenSourceInfo" component={OpenSourceInfo} />
      </SettingsStack.Navigator>
    );
  }
  

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
        <Settings/>
        {/* <Test/> */}
      </View>
    );
  }
  