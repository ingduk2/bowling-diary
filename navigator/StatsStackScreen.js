import React, { useState, useEffect } from 'react';
import {
    Button, Text, View, Image, Linking, TextInput, ScrollView, Dimensions,
    Platform, AsyncStorage
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Stats from '../components/Stats';
import loadScoreDatas from './ScoreLoad';
import { PrivateValueStore } from '@react-navigation/core';

const StatsStack = createStackNavigator();

export function StatsStackScreen() {
    return (
        <StatsStack.Navigator>
            <StatsStack.Screen name="Stats" component={StatsScreen} />
            {/* <StatsStack.Screen name="Details" component={DetailsScreen} /> */}
        </StatsStack.Navigator>
    );
}


// async function loadScoreDatas() {
//     let scoreDatas = {};
//     try {
//         const datas = await AsyncStorage.getItem("scoreDatas");
//         // console.log("datas", datas);
//         const parsedToDos = JSON.parse(datas);
//         // console.log("parsedToDos", parsedToDos);
//         if (parsedToDos == null) {
//             scoreDatas = {};
//         } else {
//             scoreDatas = parsedToDos
//         }
//         // scoreDatas = (parsedToDos == null) ? {} : parsedToDos ;
//         //                  datas == null ? {} : datas
//         // console.log("scoreDatas" , scoreDatas);
//     } catch (err) {
//         console.log(err);
//     }
//     return scoreDatas;
// }

function StatsScreen() {
    console.log("StatsScreen StatsScreen StatsScreen StatsScreen");
    const [datas, setData] = useState({});

    useEffect(() => {
        console.log("StatsScreen.useEffect");
        const fetchData = async () => {
            const articleData = await loadScoreDatas();
            // console.log(articleData);
            setData(articleData)
        }
        fetchData();
    }, []);


    return (
        <View style={{ flex: 1, padding: 3 , backgroundColor: '#fff'}}>
            <ScrollView>
                <Stats datas={datas} />
            </ScrollView>
        </View>
    );
}