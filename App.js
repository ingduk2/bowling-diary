import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons, Feather, AntDesign} from '@expo/vector-icons'; 
import Home from './Home';
import WixCalendar from './WixCalendar';
import { v1 as uuidv1 } from "uuid";
import { seed } from "./uuidSeed";
import ScoreList from './ScoreList';
import Settings from './components/Settings';
import Stats from './components/Stats';
import OpenSourceInfo from './components/OpenSourceInfo';
import { Alert } from 'react-native';
import { navigationRef } from './navi/RootNavigation';

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




function HomeScreen({ navigation }) {


  const[datas, setData] = useState({});

  const saveData = () => {
    //score
    if( _score == null || _score =='' || _date == null){
      Alert.alert("점수나 날짜를 확인해주세요");
      return;
    }
    

    const newData = Save();
    const newDatas = {
      ...datas,
      ...newData
    };
    setData(newDatas);
  }

  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
      <View>
      <ScrollView>
        <View style={{flexDirection: "row",   justifyContent: 'center', alignItems: "center",
    // width: width / 2
    }}>
        <FontAwesome5 name="bowling-ball" size={35} />
        <Home saveScore={_saveScore}/>
        <AntDesign name="enter" size={35} color="black" onPress={() => saveData() }/>
        
        </View>
      <WixCalendar saveDate={_saveDate} datas={datas}/>
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
              {...data}/>
          ))}    
        </ScrollView>
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{  }}>
      <Settings navigation={navigation}/>
      {/* <Test/> */}
    </View>
  );
}

function StatsScreen(){
  return (
    <View style={{ flex: 1 , padding : 3 }}>
      <Stats/>
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
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ title: 'Settings' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
