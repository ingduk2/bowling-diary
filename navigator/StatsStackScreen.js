import React, { useState, useEffect } from 'react';
import {
    Button, Text, View, Image, Linking, TextInput, ScrollView, Dimensions,
    Platform, AsyncStorage, Alert
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Stats from '../components/Stats';
import {loadScoreDatas} from './ScoreLoad';
import { PrivateValueStore} from '@react-navigation/core';
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons'; 


const StatsStack = createStackNavigator();

export function StatsStackScreen() {
    return (
        <StatsStack.Navigator>
            <StatsStack.Screen name="Stats" component={StatsScreen} popopo={"!23"} />
            {/* <StatsStack.Screen name="Details" component={DetailsScreen} /> */}
        </StatsStack.Navigator>
    );
}



function StatsScreen({navigation, route}, props) {
    console.log("StatsScreen StatsScreen StatsScreen StatsScreen");
    console.log(navigation, route, props);
    // Alert.alert(navigation.isFocused());
    
    // const [datas, setData] = useScoreData();

    const [datas, setData] = useState({});
    // useEffect(() => {
    //     console.log("ScoreLoads.useEffect");
    //     const fetchData = async () => {
    //         const datas = await loadScoreDatas();
    //         // console.log(articleData);
    //         setData(datas)
    //     }
    //     fetchData();
    // }, []);

    React.useEffect(
        () => navigation.addListener('focus', () => {
            console.log('Screen was ffffffffffffocused')
            _loadScoreDatas();
        }),
        []
      );
    
      React.useEffect(
        () => navigation.addListener('blur', () => console.log('Screen was unfocused')),
        []
      );

    const _loadScoreDatas = async () => {
        const datas = await loadScoreDatas();
        setData(datas);
    }

    return (
        <View style={{ flex: 1, padding: 3 , backgroundColor: '#fff'}}>
            <ScrollView>
                <Stats datas={datas} />
            </ScrollView>
            {/* <FloatingAction
        // ref={(ref) => { this.floatingAction = ref; }}
        // actions={actions}
        showBackground={false}
        // overrideWithAction={false}
        animated={false}
        onPressMain={() => {
            console.log("1");
            _loadScoreDatas();
        }}
        floatingIcon={<AntDesign name="reload1" size={24} color="white" />}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          
        }}
      /> */}
        </View>
    );
}