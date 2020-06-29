import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5} from '@expo/vector-icons'; 
import { Ionicons} from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import Home from './Home';
import MyCalendar from './MyCalendar';
import WixCalendar from './WixCalendar';
import { v1 as uuidv1 } from "uuid";
import { seed } from "./uuidSeed";

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
      <ScrollView>
      <Home saveScore={_saveScore}/>
      <WixCalendar saveDate={_saveDate}/>
      </ScrollView>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();


function Save() {
  const ID = uuidv1({ random:seed()});
  console.log("Save", _score, _date, ID);
  //key
  //  date
  //  score
  

}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <FontAwesome5 
                name="bowling-ball" 
                size={30} 
                onPress={() => {
                  Save()
                }}
                style={{paddingRight:10}}/>
                
              
            ),
            headerLeft: () => (
              <Feather 
                name="phone-forwarded" 
                size={30}
                onPress={() => Linking.openURL('tel:01012341234')}
                style={{paddingLeft:10}}
                />
            ),
          }}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
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

  const[score, setScore] = useState(0);
  const[date, setDate] = useState("");
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconTag;
            if (route.name === 'Home') {
              // iconName = focused ? 'md-home' : 'md-home';
              
              iconTag = focused ? 
              <Ionicons name='md-home' size={40} color={color} /> :
              <Ionicons name="md-home" size={40} color={color} /> ;

            } else if (route.name === 'Settings') {
              // iconName = focused ? 'ios-list-box' : 'ios-list';
              iconTag = <Ionicons name='ios-list' size={40} color={color} />
            }

            // You can return any component that you like here!
            // return <Ionicons name={iconName} size={40} color={color} />;
            return iconTag;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen} options={{ title: 'Settings' }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
