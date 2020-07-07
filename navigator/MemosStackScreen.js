import React, { useState, useEffect } from 'react';
import {
  Button, Text, View, Image, Linking, TextInput, ScrollView, Dimensions, StyleSheet,
  Platform, AsyncStorage, Alert, Modal, TouchableHighlight
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MemoList from '../components/MemoList';
import { ListItem, Divider, SearchBar } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import { v1 as uuidv1 } from "uuid";
import { seed } from "../uuid/uuidSeed";

const { width, height } = Dimensions.get("window");
const MsmosStack = createStackNavigator();

export function MemosStackScreen() {
  return (
    <MsmosStack.Navigator>
      <MsmosStack.Screen name="Memos" component={MemosScreen} />
    </MsmosStack.Navigator>
  );
}

const actions = [
  {
    text: "Accessibility",
    icon: require("../assets/icon.png"),
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    icon: require("../assets/icon.png"),
    name: "bt_language",
    position: 1
  },
  {
    text: "Location",
    icon: require("../assets/icon.png"),
    name: "bt_room",
    position: 3
  },
  {
    text: "Video",
    icon: require("../assets/icon.png"),
    name: "bt_videocam",
    position: 4
  }
];


async function loadMemoDatas() {
  let memoDatas = {};
  try{
      const datas = await AsyncStorage.getItem("memoDatas");
      // console.log("datas", datas);
      const parsedToDos = JSON.parse(datas);
      console.log("parsedToDos", parsedToDos);
      if (parsedToDos == null) {
          memoDatas = {};
      } else {
          memoDatas = parsedToDos
      }
      
  } catch (err) {
      console.log(err);
  }
  return memoDatas;
}

function MemosScreen() {
  const [memos, setMemos] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const diskMemoDatas = await loadMemoDatas();
      // console.log(articleData);
      setMemos(diskMemoDatas);
  }

  fetchData();
  }, []);

  const _addMemo = () => {
    const ID = uuidv1({ random: seed() });
    const addMemo = {
      [ID] : {
        id : ID,
        title : title,
        content : content,
        createdAt: Date.now()
      }
    }

    const newMemos = {
      ...memos,
      ...addMemo
    }
    _saveMemosData(newMemos);
    setMemos(newMemos);
  }

  const _deleteMemo = (id) => {
    delete memos[id];
    const newMemos = {
      ...memos
    }
    _saveMemosData(newMemos);
    setMemos(newMemos);
  }

  const _updateMemo = (memo) => {
    const {id, title, content} = memo;
    const newMemos = {
      ...memos,
      [id] : {...memos[id] , title:title, content:content}
    }
    _saveMemosData(newMemos);
    setMemos(newMemos);
  }

  const _saveMemosData = (memos) => {
    console.log(memos);
    const saveMemosData = AsyncStorage.setItem("memoDatas", JSON.stringify(memos));
};

  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: '#fff' }}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>메모 입력</Text>
            <TextInput style={styles.modalTitle}
              placeholder="제목"
              value={title}
              editable={true}
              underlineColorAndroid={"transparent"}
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline={true}
              autoCorrect={false}
              onChangeText = {setTitle}

            ></TextInput>
            <TextInput style={styles.modalContent}
              value={content}
              placeholder="내용"
              editable={true}
              underlineColorAndroid={"transparent"}
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline={true}
              autoCorrect={false}
              onChangeText = {setContent}
            >

            </TextInput>
            <View style={styles.actions}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>cancle</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#219FFF", marginLeft: 20, width: 60 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  //update Score...
                  _addMemo();
                }}
              >
                <Text style={styles.textStyle}>ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>



      {/* <Memos/> */}
      <View>
        <SearchBar platform="ios" value={searchValue} placeholder="Search" onChangeText={setSearchValue} />
        <Divider />
      </View>
      <ScrollView>
        {Object.values(memos).sort((a,b) => {
          return b.createdAt - a.createdAt
        }).map(memo => {
          console.log("===========================");
          console.log(searchValue);

          if(searchValue == "" || memo.title.includes(searchValue) || memo.content.includes(searchValue)){
          return <MemoList 
            key ={memo.id}
            deleteMemo={_deleteMemo}
            updateMemo={_updateMemo}
            {...memo}
            />
          }
        })}
      </ScrollView>
      {/* <View style={styles.container}> */}

      <FloatingAction
        // ref={(ref) => { this.floatingAction = ref; }}
        // actions={actions}
        showBackground={false}
        // overrideWithAction={false}
        animated={false}
        onPressMain={() => {
          console.log("onPress");
          setTitle("");
          setContent("");
          setModalVisible(!modalVisible);
        }}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          setModalVisible(!modalVisible);
        }}
      />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008000"
  },

  actions: {
    flexDirection: "row"
  },
  modalTitle: {
    width: width / 2,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center'
    // justifyContent: 'center'

  },
  modalContent: {
    width: width / 2,
    height: height / 10,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center'
    // justifyContent: 'center'

  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center"
  }

});
