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
  Button,
} from 'react-native';
import { FontAwesome5, AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-elements';
import PropTypes from 'prop-types';
import MapSearch from '../map/MapSearch';

const { width, height } = Dimensions.get('window');

export default function ScoreModal(props) {
  const {
    id,
    score,
    place,
    placeId,
    condition,
    modalVisible,
    setModalVisible,
    addScoreData,
    updateScoreData,
    modalState,
  } = props;
  const [modalScore, setModalScore] = useState(score);
  const [modalPlace, setModalPlace] = useState(place);
  const [modalPlaceId, setModalPlaceId] = useState(placeId);
  const [modalCondition, setModalCondition] = useState(condition);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    console.log('useEffect score', props.score);
    setModalScore(props.score);
  }, [props]);

  useEffect(() => {
    console.log('useEffect place', props.place);
    setModalPlace(props.place);
  }, [props]);

  useEffect(() => {
    console.log('useEffect placeId', props.placeId);
    setModalPlaceId(props.place);
  }, [props]);

  useEffect(() => {
    console.log('useEffect condition', props.condition);
    setModalCondition(props.condition);
  }, [props]);

  function changeModal() {
    setModalVisible(!modalVisible);
  }

  function savePlaceInfo(info) {
    console.log('searchPlace', info);
    setModalPlace(info.name);
    setModalPlaceId(info.placeId);
  }
  return (
    <View>
      <MapSearch
        searchModalVisible={searchModalVisible}
        setSearchModalVisible={setSearchModalVisible}
        savePlaceInfo={savePlaceInfo}
        changeModal={changeModal}
      />

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
            <Text style={styles.modalText}>{modalState === 'add' ? '점수 입력' : '점수 수정'}</Text>
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
                  }}
                />
                {/* <MaterialIcons name="place" size={35} color="black" onPress={() => {}} /> */}
                {/* <Entypo name="plus" size={35} color="black" /> */}
              </View>
              <View style={{ flexDirection: 'row' }}>
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
                  }}
                />
                <Button
                  title="search"
                  onPress={() => {
                    // setPlace('');
                    setSearchModalVisible(!searchModalVisible);
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  if (modalState === 'add') {
                    const addData = {
                      score: modalScore,
                      place: modalPlace,
                      condition: modalCondition,
                      placeId: modalPlaceId,
                    };
                    addScoreData(addData);
                  } else if (modalState === 'update') {
                    console.log(
                      'ScoreModal',
                      id,
                      modalScore,
                      modalPlace,
                      modalPlaceId,
                      modalCondition,
                    );
                    updateScoreData(id, modalScore, modalPlace, modalPlaceId, modalCondition);
                    setModalVisible(!modalVisible);
                  }
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

ScoreModal.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  condition: PropTypes.number.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  addScoreData: PropTypes.func.isRequired,
  updateScoreData: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  modalState: PropTypes.string.isRequired,
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
