import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Button, Dimensions, TextInput, TouchableOpacity, Alert, Modal, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from "prop-types";
import { ListItem, Divider, SearchBar } from 'react-native-elements';


const { width, height } = Dimensions.get("window");


export default function MemoList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  

  const {id, title, content , createdAt, deleteMemo, updateMemo} = props;
  const [newtitle, setNewTitle] = useState(title);
  const [newcontent, setNewContent] = useState(content);
  return (
    <View style={styles.container}>

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
              value={newtitle}
              editable={true}
              underlineColorAndroid={"transparent"}
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline={true}
              autoCorrect={false}
              onChangeText = {setNewTitle}

            ></TextInput>
            <TextInput style={styles.modalContent}
              value={newcontent}
              placeholder="내용"
              editable={true}
              underlineColorAndroid={"transparent"}
              // keyboardType='numeric'
              // maxLength={3}
              // returnKeyType={"done"}
              multiline={true}
              autoCorrect={false}
              onChangeText = {setNewContent}
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
                  const newMemo = {
                    id : id,
                    title : newtitle,
                    content : newcontent
                  }
                  updateMemo(newMemo)
                }}
              >
                <Text style={styles.textStyle}>ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>




      <View>
        <View style={styles.column}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
              <TouchableOpacity onPress={() => {
                setModalVisible(!modalVisible)
                }}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                deleteMemo(id)}
                }>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <Text>{content}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  dot: {
    marginRight: 20
  },
  container: {
    width: width,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "500",
    fontSize: 15,
    marginVertical: 15,
    width: width / 2 + 40,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    justifyContent: "space-between"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  title: {
    fontWeight: "700",
    fontSize: 30,
    marginVertical: 10,
    // width: width / 2 + 40,
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