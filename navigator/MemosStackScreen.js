import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform, AsyncStorage} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Memos from '../components/Memos';


const MsmosStack = createStackNavigator();

export function MemosStackScreen(){
    return (
      <MsmosStack.Navigator>
        <MsmosStack.Screen name="Memos" component={MemosScreen} />
      </MsmosStack.Navigator>
    );
  }


function MemosScreen(){
    return (
      <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
        {/* <Memos/> */}
        <Memos/>
      </View>
    );
  }