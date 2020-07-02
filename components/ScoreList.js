import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,Dimensions,TextInput, TouchableOpacity, Alert,Modal, TouchableHighlight} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import PropTypes from "prop-types";


const { width, height } = Dimensions.get("window");


ScoreList.propTypes = {
  id : PropTypes.string.isRequired,
  deleteScoreData : PropTypes.func.isRequired,
  updateScoreData : PropTypes.func.isRequired,
  score : PropTypes.string.isRequired,
  date : PropTypes.string.isRequired
};

export default function ScoreList(props){

    const[isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const {deleteScoreData, updateScoreData, id, date, score} = props;
    const [newScore, setNewScore] = useState(score);

    

    const _startEditing = () => {
      // setIsEditing(true);
      setModalVisible(true);
      // createTwoButtonAlert();
    }

    const _finishEditing = () => {
      setIsEditing(false);
    }


    const createTwoButtonAlert = () =>
    Alert.alert(
      "점수 수정",
      "수정하장",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    
    
    // let ms = props.createdAt
    // let dateString = props.date;
    // console.log(new Date(dateString).getTime(), new Date(ms).toLocaleString());
    // const time = new Date(ms).toLocaleString();
    return (
        <View style={styles.container}>


{/* <View style={styles.centeredView}> */}
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
            <Text style={styles.modalText}>점수 수정</Text>
            <TextInput style = {styles.modalInput} 
              placeholder="Score"
              value = {newScore}
              editable={true}
              underlineColorAndroid={"transparent"}  
                    keyboardType='numeric'
                    maxLength={3}
                    returnKeyType={"done"}
                    onChangeText={(score) => {
                      console.log(score);
                      if(Number(score) > 300){
                          console.log("300!!!!");
                          score = "300";
                      }
                      setNewScore(score);
                      
                  }}
            ></TextInput>
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
              style={{ ...styles.openButton, backgroundColor: "#219FFF" , marginLeft:20, width:60}}
              onPress={() => {
                setModalVisible(!modalVisible);
                //update Score...
                updateScoreData(id ,newScore);
              }}
            >
              <Text style={styles.textStyle}>ok</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      {/* <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
      {/* </View> */}




            <View style={styles.column}>
            <Entypo style={styles.dot} name="dot-single" size={24} color="black" />
                <Text style={styles.text}>{date} ( {score} 점 ) </Text>


{isEditing ? (
  <View style={styles.actions}>
    <TouchableOpacity onPressOut={_finishEditing}>
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>✅</Text>
      </View>
    </TouchableOpacity>
  </View>
) : (
                <View style={styles.actions}>
                <TouchableOpacity onPressOut={_startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>

                <TouchableOpacity
              onPressOut={event => {deleteScoreData(id) }}
              >
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
            </View>
)}

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    dot : {
      marginRight : 20
    },
    container: {
      width: width - 50,
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
      fontSize: 19,
      marginVertical: 19,
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
      width: width / 2
    },
    actions: {
      flexDirection: "row"
    },
    actionContainer: {
      marginVertical: 10,
      marginHorizontal: 10
    },
    

    modalInput:{
      width : width / 4.5,
      borderColor: 'black',
      padding: 2,
      margin: 10,
      borderBottomColor: "#bbb",
      borderBottomWidth: 1,
      fontSize: 25,
      // alignItems : 'center',
      textAlign : 'center'
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