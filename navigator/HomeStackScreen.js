import React, { useState, useEffect } from 'react';
import {
    Button, Text, View, Image, Linking, TextInput, ScrollView, Dimensions,
    Platform, AsyncStorage, Alert
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, FontAwesome, Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import ScoreInput from '../components/ScoreInput';
import WixCalendar from '../components/WixCalendar';
import { v1 as uuidv1 } from "uuid";
import { seed } from "../uuid/uuidSeed";
import ScoreList from '../components/ScoreList';



// let _score;
// let _date;

const HomeStack = createStackNavigator();

function LogoTitle() {
    return (
        <Image
            style={{ width: 110, height: 40 }}
            source={require('../assets/gorilla.png')}
        />
    );
}

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                headerTitle: props => <LogoTitle {...props} />,
                headerTitleStyles: {
                    paddingLeft: 20
                },
                headerRight: () => (
                    <AntDesign
                        name="instagram"
                        size={33}
                        onPress={() => {
                            let appUrl = 'instagram://user?username=gorilla_bowling_shop';
                            let webUrl = 'https://www.instagram.com/gorilla_bowling_shop';
                            Linking.canOpenURL(appUrl)
                                .then((supported) => {
                                    Linking.openURL(supported ? appUrl : webUrl)
                                }
                                )
                                .catch((err) => Alert.alert(err));
                        }}
                        style={{ paddingRight: 20 }} />
                ),
                headerLeft: () => (
                    <Feather
                        name="phone-forwarded"
                        size={33}
                        onPress={() => Linking.openURL('tel:01012341234')}
                        style={{ paddingLeft: 20 }}
                    />
                ),
            }} />
            {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
        </HomeStack.Navigator>
    );
}


function HomeScreen() {

    let nowDay = new Date();
    let year = nowDay.getFullYear().toString();
    let month = (nowDay.getMonth() + 1).toString();
    let day = nowDay.getDate().toString();

    const nowDate = year + '-' + (month.length == 1 ? '0' : '') + month + '-' + (day.length == 1 ? '0' : '') + day;

    const [datas, setData] = useState({});
    const [_score , set_Score] = useState();
    const [_date, set_Date] = useState(nowDate);

    

    // _saveDate(nowDate);
    // set_Date(nowDate);
    // Alert.alert(nowDate);
    useEffect(() => {

        const fetchData = async () => {
            const diskScoreDatas = await loadScoreDatas();
            // console.log(articleData);
            setData(diskScoreDatas)
        }

        fetchData();
    }, []);


    const Save = () => {
        const ID = uuidv1({ random: seed() });
        console.log("Save", _score, _date, ID);
        const newDataObject = {
            [ID]: {
                id: ID,
                score: _score,
                date: _date,
                createdAt: Date.now()
            }
        };
    
        console.log(newDataObject);
        return newDataObject;
    }

    const _saveScore = (score) => {
        console.log("--Main saveScore ", score);
        set_Score(score);
        console.log("--Main saveScore ", _score);
    }
    
    const _saveDate = (date) => {
        console.log("--Main saveDate ", date);
        set_Date(date);
        console.log("--Main saveScore ", _date);
    }

    const _addScoreData = () => {
        //score
        console.log("_addScoreData", _score, _date);
        if (_score == null || _score == '' || _date == null) {
            Alert.alert("점수나 날짜를 확인해주세요");
            return;
        }

        const newData = Save();
        const newDatas = {
            ...datas,
            ...newData
        };

        set_Score("")
        // set_Date("")
        _saveScoreData(newDatas);
        setData(newDatas);
    }

    const _deleteScoreData = (id) => {

        //id 로 data 지우고 setData 하면 될듯함.
        delete datas[id];
        const newDatas = {
            ...datas
        }
        _saveScoreData(newDatas);
        setData(newDatas);
    }

    const _updateScoreData = (id, score) => {
        const newDatas = {
            ...datas,

            [id]: { ...datas[id], score: score }

        }
        _saveScoreData(newDatas);
        setData(newDatas);
    }

    const _saveScoreData = (datas) => {
        const saveScoreData = AsyncStorage.setItem("scoreDatas", JSON.stringify(datas));
    };

    return (
        <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
            <View>
                <ScrollView>
                    <View style={{
                        flexDirection: "row", justifyContent: 'center', alignItems: "center",
                        // width: width / 2
                    }}>
                        {/* <FontAwesome5 name="bowling-ball" size={35} /> */}
                        <ScoreInput saveScore={_saveScore} addScoreData={_addScoreData} />
                        {/* <AntDesign name="enter" size={35} color="black" onPress={() => _addScoreData() }/> */}

                    </View>
                    <WixCalendar saveDate={_saveDate} datas={datas} nowDate={nowDate} />
                </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                    {Object.values(datas == null ? {} : datas).sort((a, b) =>
                        // a.date - b.date
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    ).map((data) => {
                        if( data.date == _date){
                        
                           return  <ScoreList
                            key={data.id}
                            deleteScoreData={_deleteScoreData}
                            updateScoreData={_updateScoreData}
                            {...data} />
                        }
                    })}
                </ScrollView>
            </View>
        </View>
    );
}






async function loadScoreDatas() {
    let scoreDatas = {};
    try {
        const datas = await AsyncStorage.getItem("scoreDatas");
        // console.log("datas", datas);
        const parsedToDos = JSON.parse(datas);
        // console.log("parsedToDos", parsedToDos);
        if (parsedToDos == null) {
            scoreDatas = {};
        } else {
            scoreDatas = parsedToDos
        }
        // scoreDatas = (parsedToDos == null) ? {} : parsedToDos ;
        //                  datas == null ? {} : datas
        // console.log("scoreDatas" , scoreDatas);
    } catch (err) {
        console.log(err);
    }
    return scoreDatas;
}
