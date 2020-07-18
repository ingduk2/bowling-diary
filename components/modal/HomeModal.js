/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome5, AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-elements';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default function HomeModal(props) {
  const { modalVisible, setModalVisible, setScore, setPlace, setCondition, addScoreData } = props;
  const [modalScore, setModalScore] = useState('');
  const [modalPlace, setModalPlace] = useState('');
  const [modalCondition, setModalCondition] = useState(5);
  //   useEffect(() => {
  //     console.log('title');
  //     setNewTitle(props.title);
  //   }, [props]);

  //   useEffect(() => {
  //     console.log('content');
  //     setNewContent(props.content);
  //   }, [props]);

  //   const [title, setTitle] = useState(title);
  //   const [content, setContent] = useState(title);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>점수 입력</Text>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome5 name="bowling-ball" size={35} />
                {/* <MyCalendar/> */}
                <TextInput
                  // value={score == "-" ? null : score}
                  value={modalScore}
                  style={[styles.input, styles.inputSizeScore]}
                  placeholder="Score"
                  underlineColorAndroid="transparent"
                  keyboardType="number-pad"
                  maxLength={3}
                  returnKeyType="done"
                  // onBlur={this._inputScore}
                  maxValue={300}
                  onChangeText={(textScore) => {
                    let returnScore = textScore;
                    console.log(returnScore);
                    if (Number(returnScore) > 300) {
                      console.log('300!!!!');
                      returnScore = '300';
                    }
                    setModalScore(returnScore);
                    setScore(returnScore);
                  }}
                />
                {/* <MaterialIcons name="place" size={35} color="black" onPress={() => {}} /> */}
                {/* <Entypo name="plus" size={35} color="black" /> */}
              </View>
              <View style={{ flexDirection: 'row', paddingRight: 35 }}>
                <MaterialIcons name="place" size={35} color="black" />
                <TextInput
                  value={modalPlace}
                  style={[styles.input, styles.inputSizePlace]}
                  placeholder="Place"
                  multiline
                  blurOnSubmit
                  returnKeyType="done"
                  maxLength={10}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    setModalPlace(text);
                    setPlace(text);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', paddingRight: 35, alignItems: 'center' }}>
                <FontAwesome name="heartbeat" size={35} color="black" />
                <Rating
                  type="heart"
                  ratingCount={5}
                  imageSize={40}
                  startingValue={modalCondition}
                  // showRating
                  onStartRating={() => {
                    console.log('start');
                  }}
                  onFinishRating={(rating) => {
                    setModalCondition(rating);
                    setCondition(rating);
                  }}
                />
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>cancle</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: '#219FFF',
                  marginLeft: 20,
                  width: 60,
                }}
                onPress={() => {
                  console.log(modalScore, modalPlace, modalCondition);
                  //   setScore(modalScore);
                  //   setPlace(modalPlace);
                  //   setCondition(modalCondition);
                  setModalScore('');
                  addScoreData();
                  //   setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>ok</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

HomeModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  addScoreData: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  setPlace: PropTypes.func.isRequired,
  setCondition: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    width: width / 4.5,
    // padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    textAlign: 'center',
  },
  inputSizeScore: {
    width: width / 4.5,
  },
  inputSizePlace: {
    width: width / 1.9,
  },

  actions: {
    flexDirection: 'row',
  },
  modalTitle: {
    width: width / 2,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center',
    // justifyContent: 'center'
  },
  modalContent: {
    width: width / 2,
    height: height / 10,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems : 'center',
    textAlign: 'center',
    // justifyContent: 'center'
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
  },
});
