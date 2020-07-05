import React , {useState, useEffect} from 'react';
import { Button, Text, View , Image, Linking, TextInput, ScrollView, Dimensions,
  Platform, AsyncStorage, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Memos from '../components/Memos';
import MemoList from '../components/MemoList';


const MsmosStack = createStackNavigator();

export function MemosStackScreen(){
    return (
      <MsmosStack.Navigator>
        <MsmosStack.Screen name="Memos" component={MemosScreen} />
      </MsmosStack.Navigator>
    );
  }


function MemosScreen(){
    const [memos, setMemos] = useState([]);

    
  //   const newDataObject = {
  //     [ID]: {
  //         id: ID,
  //         score: _score,
  //         date: _date,
  //         createdAt: Date.now()
  //     }
  // };

  const makeTitle = (title, index) => {
    return <View style={{ width: '100%', flexDirection: "row", justifyContent: 'space-between', }}><Text style={{ fontWeight: "600", fontSize: 30 }}>{title}</Text><Button title="X" onPress={console.log(index)}/></View>
  }

  const onClicktest = (index) => {
    Alert.alert(index);
  }

  useEffect(() => {
     // const memoDatas = [];
  const dataMM = {
    data : [{
      title: makeTitle(1, 0),
      subtitle: 'subtitle',
      func : onClicktest
    }]
  }

  const dataMM2 = {
    data : [{
      title: makeTitle(2, 1),
      subtitle: 'subtitle',
      func : onClicktest
    }]
  }

  const dataMM3 = {
    data : [{
      title: makeTitle(3, 2),
      subtitle: 'subtitle',
      func : onClicktest
    }]
  }
  // memoDatas.push();
  // console.log(dataMM);

  const memoDatas = [
    dataMM,
    dataMM2,
    dataMM3
  ];

  // memoDatas.splice(1, 1);
  
  setMemos(memoDatas);
    
}, []);

 
    
  // console.log(memoDatas);
    return (
      <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>
        {/* <Memos/> */}
        <Memos memos={memos}/>
      </View>
    );
  }