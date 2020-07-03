import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform, AsyncStorage} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome,  Ionicons, Feather, AntDesign} from '@expo/vector-icons'; 
import ScoreInput from './components/ScoreInput';
import WixCalendar from './components/WixCalendar';
import { v1 as uuidv1 } from "uuid";
import { seed } from "./uuid/uuidSeed";
import ScoreList from './components/ScoreList';
import Settings from './components/Settings';
import Stats from './components/Stats';
import Memos from './components/Memos';

import OpenSourceInfo from './components/OpenSourceInfo';
import { Alert } from 'react-native';
import { navigationRef } from './navi/RootNavigation';
import {AppLoading} from 'expo';
import { Asset } from 'expo-asset';

const SettingsStack = createStackNavigator();

export function MemosStackScreen(){
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Memos" component={MemosScreen} />
      </SettingsStack.Navigator>
    );
  }


function MemosScreen(){
    return (
      <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
        <Memos/>
        {/* <Test/> */}
      </View>
    );
  }