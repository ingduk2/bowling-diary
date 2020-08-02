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
    placeId,
    condition,
    modalVisible,
    setModalVisible,
    setModalState,
    setUpdateModalData,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo style={styles.dot} name="dot-single" size={24} color="black" />
          {/* <Text style={styles.text}>
            [{place}] {score} 점 ({condition})
          </Text> */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="place"
                size={24}
                // color="yellow"
                style={{ color: '#c3ebff' }}
              />
              <Text style={styles.text}>{place}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome5 name="bowling-ball" size={20} color="#c3ebff" />
              <Text style={styles.text}>{score}점</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="heartbeat" size={24} color="#c3ebff" />
            <Text style={styles.conditionText}>{condition}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPressOut={() => {
              setModalState('update');
              const updateData = {
                id,
                score,
                place,
                placeId,
                condition,
              };
              console.log('ScoreList', updateData);
              setUpdateModalData(updateData);
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.actionContainer}>
              <Entypo name="pencil" size={24} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPressOut={() => {
              deleteScoreData(id);
            }}
          >
            <View style={styles.actionContainer}>
              <Feather name="trash-2" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

ScoreList.propTypes = {
  id: PropTypes.string.isRequired,
  deleteScoreData: PropTypes.func.isRequired,
  score: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  condition: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  setUpdateModalData: PropTypes.func.isRequired,
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
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
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
    width: width / 2.3,
    fontWeight: '500',
    fontSize: 15,
    // marginVertical: 15,
    // paddingRight: 20,
    // width: width / 2 + 40,
  },
  conditionText: {
    width: '4%',
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 15,
    paddingRight: 20,
    // backgroundColor: 'yellow',
  },
  column: {
    // backgroundColor: '#bbb',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // width: width / 2,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    // backgroundColor: 'blue',
  },
});
