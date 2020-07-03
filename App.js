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
// import {MemosStackScreen} from './na'


const { height, width } = Dimensions.get("window");

function DetailsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Details!</Text>
    </View>
  );
}

let _score;
let _date;


function _saveScore(score){
  console.log("--Main saveScore ", score);
  _score = score;
  console.log("--Main saveScore ", _score);
}

function _saveDate(date){
  console.log("--Main saveDate ", date);
  _date = date;
  console.log("--Main saveScore ", _date);
}


async function loadScoreDatas(){
  let scoreDatas = {};
  try {
    const datas = await AsyncStorage.getItem("scoreDatas");
    // console.log("datas", datas);
    const parsedToDos = JSON.parse(datas);
    // console.log("parsedToDos", parsedToDos);
    if(parsedToDos == null){
      scoreDatas = {};
    } else{
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

function HomeScreen() {

  const[datas, setData] = useState({});

  let nowDay = new Date();
  let year = nowDay.getFullYear().toString();
  let month = (nowDay.getMonth() + 1).toString();
  let day = nowDay.getDate().toString();

  const nowDate = year + '-' + (month.length == 1 ? '0' : '') + month + '-' + (day.length == 1 ? '0' : '') + day;
  _saveDate(nowDate);
  // Alert.alert(nowDate);
  useEffect(() => {
    
      const fetchData = async () => {
      const diskScoreDatas = await loadScoreDatas();
      // console.log(articleData);
      setData(diskScoreDatas)
      }
      
      fetchData();
  }, []);

  const _addScoreData = () => {
    //score
    console.log("_addScoreData" , _score, _date);
    if( _score == null || _score =='' || _date == null){
      Alert.alert("점수나 날짜를 확인해주세요");
      return;
    }

    
    const newData = Save();
    const newDatas = {
      ...datas,
      ...newData
    };

    _score = "";
    _date = "";
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
      
        [id]:{...datas[id], score: score}

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
        <View style={{flexDirection: "row",   justifyContent: 'center', alignItems: "center",
    // width: width / 2
    }}>
        {/* <FontAwesome5 name="bowling-ball" size={35} /> */}
        <ScoreInput saveScore={_saveScore} addScoreData={_addScoreData}/>
        {/* <AntDesign name="enter" size={35} color="black" onPress={() => _addScoreData() }/> */}
        
        </View>
      <WixCalendar saveDate={_saveDate} datas={datas} nowDate={nowDate}/>
      </ScrollView>
      </View>
      <View style={{flex:1}}>
        <ScrollView contentContainerStyle={{alignItems:'center'}}>
          {Object.values(datas == null ? {} : datas).sort((a, b) =>
            // a.date - b.date
            new Date(b.date).getTime() - new Date(a.date).getTime()
          ).map(data => (
            <ScoreList
              key = {data.id}
              deleteScoreData={_deleteScoreData}
              updateScoreData={_updateScoreData}
              {...data}/>
          ))}    
        </ScrollView>
      </View>
    </View>
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

function StatsScreen(){
  console.log("StatsScreen StatsScreen StatsScreen StatsScreen");
  const[datas, setData] = useState({});

  useEffect(() => {
      console.log("StatsScreen.useEffect");
      const fetchData = async () => {
      const articleData = await loadScoreDatas();
      // console.log(articleData);
      setData(articleData)
      }
      
      fetchData();
  },[]);

  
  return (
    <View style={{ flex: 1 , padding : 3 }}>
      <Stats datas = {datas}/>
    </View>
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

const HomeStack = createStackNavigator();


function Save() {
  const ID = uuidv1({ random:seed()});
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

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerTitleStyles: {
              paddingLeft : 20
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
                style={{paddingRight:20}}/>
            ),
            headerLeft: () => (
              <Feather 
                name="phone-forwarded" 
                size={33}
                onPress={() => Linking.openURL('tel:01012341234')}
                style={{paddingLeft:20}}
                />
            ),
          }}/>
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
      <SettingsStack.Screen name="OpenSourceInfo" component={OpenSourceInfo} />
    </SettingsStack.Navigator>
  );
}
function StatsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Stats" component={StatsScreen} />
      {/* <SettingsStack.Screen name="Details" component={DetailsScreen} /> */}
    </SettingsStack.Navigator>
  );
}

function MemosStackScreen(){
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Memos" component={MemosScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 110, height: 40 }}
      source={require('./assets/gorilla.png')}
    />
  );
}

export default function App() {
  const [isReady , setIsReady] = useState(false);

  const _cacheResourceAsync = async () => {
    const images = [
      require('./assets/gorilla.png'),
      require('./assets/icon.png'),
      require('./assets/splash.png')
    ]
    const cacheImages = images.map(image =>{
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }

  if (isReady){
    return (
      <NavigationContainer ref = {navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconTag;
            if (route.name === 'Home') {
              iconTag = focused ? 
              <Ionicons name='md-home' size={40} color={color} /> :
              <Ionicons name="md-home" size={40} color={color} /> ;

            } else if (route.name === 'Settings') {
              // iconName = focused ? 'ios-list-box' : 'ios-list';
              iconTag = <Ionicons name='ios-list' size={40} color={color} />
            } else if (route.name == 'Stats'){
              iconTag = <Ionicons name="md-stats" size={40} color={color} />
            } else if (route.name == 'Memos'){
              iconTag = <FontAwesome name="sticky-note-o" size={40} color={color} />
            }
            return iconTag;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }}/>
        <Tab.Screen name="Stats" component={StatsStackScreen} options={{title: 'Stats'}}/>
        <Tab.Screen name="Memos" component={MemosStackScreen} options={{title: 'Memos'}}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ title: 'Settings' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
  } else {
    return (
      <AppLoading
        startAsync={_cacheResourceAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );  
  }

  
}
