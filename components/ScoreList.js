/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo, Feather, FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default function ScoreList(props) {
  // console.log(ScoreList, props);
  const {
    deleteScoreData,
    id,
    date,
    score,
    place,
    condition,
    setId,
    setScore,
    setPlace,
    setCondition,
    modalVisible,
    setModalVisible,
    setModalState,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo style={styles.dot} name="dot-single" size={24} color="black" />
          {/* <Text style={styles.text}>
            [{place}] {score} 점 ({condition})
          </Text> */}
          <MaterialIcons
            name="place"
            size={30}
            // color="yellow"
            style={{ color: '#c3ebff' }}
          />
          <Text style={styles.text}>{place}</Text>
          <FontAwesome5 name="bowling-ball" size={24} color="#c3ebff" />
          <Text style={styles.text}>{score}점</Text>

          <FontAwesome name="heartbeat" size={24} color="#c3ebff" />
          <Text style={styles.text}>{condition}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPressOut={() => {
              setModalState('update');
              setId(id);
              setScore(score);
              setPlace(place);
              setCondition(condition);
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.actionContainer}>
              {/* <Text style={styles.actionText}>✏️</Text> */}
              <Entypo name="pencil" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              deleteScoreData(id);
            }}
          >
            <View style={styles.actionContainer}>
              {/* <Text style={styles.actionText}>❌</Text> */}
              <Feather name="trash-2" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

ScoreList.propTypes = {
  setId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  deleteScoreData: PropTypes.func.isRequired,
  // updateScoreData: PropTypes.func.isRequired,
  score: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  condition: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  setPlace: PropTypes.func.isRequired,
  setCondition: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  textDate: {
    fontWeight: '700',
    fontSize: 20,
  },
  dot: {
    marginRight: 10,
  },
  container: {
    // backgroundColor : "#bbb",
    width,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20,
  },
  completedCircle: {
    borderColor: '#bbb',
  },
  uncompletedCircle: {
    borderColor: '#F23657',
  },
  text: {
    width: width / 6,
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 15,
    paddingRight: 20,
    // width: width / 2 + 40,
  },
  completedText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    color: '#353839',
  },
  column: {
    // backgroundColor : "#bbb",
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },

  modalInputScore: {
    width: width / 4.5,
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

  modalInputPlace: {
    width: width / 1.8,
    borderColor: 'black',
    padding: 2,
    margin: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    // alignItems: 'center',
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
