/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Alert, Button } from 'react-native';
import { FontAwesome5, AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Rating, AirbnbRating, SearchBar } from 'react-native-elements';
import * as Location from 'expo-location';
import HomeThemeContext from '../context/HomeThemeContext';
import MapSearch from './map/MapSearch';

const { width } = Dimensions.get('window');

export default function ScoreInput(props) {
  const { addScoreData, calandarEnable } = props;
  const [score, setScore] = useState('');
  const [place, setPlace] = useState('');
  const [condition, setCondition] = useState(5);
  const [placeId, setPlaceId] = useState('0');
  const { homeThemes } = useContext(HomeThemeContext);

  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const ratingCompleted = (rating) => {
    console.log(rating);
    setCondition(rating);
  };

  const savePlaceInfo = (info) => {
    console.log('scoreInput', info);
    setPlace(info.name);
    setPlaceId(info.placeId);
  };

  function changeModal() {}
  // if (homeThemes == null) homeThemes = null;
  // console.log('ScoreInput', homeThemes);
  return homeThemes ? (
    <View style={styles.container}>
      <MapSearch
        searchModalVisible={searchModalVisible}
        setSearchModalVisible={setSearchModalVisible}
        savePlaceInfo={savePlaceInfo}
        changeModal={changeModal}
      />
      {(!calandarEnable || homeThemes.scoreInput.enable === true) && (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5 name="bowling-ball" size={33} />
          {/* <MyCalendar/> */}
          <TextInput
            // value={score == "-" ? null : score}
            value={score}
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
              setScore(returnScore);
            }}
          />
          <AntDesign
            // style={{ backgroundColor: 'red' }}
            name="enter"
            size={35}
            color="black"
            onPress={() => {
              setScore('');
              const addData = {
                score,
                place,
                condition,
                placeId,
              };
              addScoreData(addData);
            }}
          />
          {/* <MaterialIcons name="place" size={35} color="black" onPress={() => {}} /> */}
          {/* <Entypo name="plus" size={35} color="black" /> */}
        </View>
      )}
      {(!calandarEnable || homeThemes.placeInput.enable === true) === true && (
        <View style={{ flexDirection: 'row', paddingLeft: 45 }}>
          <MaterialIcons name="place" size={38} color="black" />
          <TextInput
            value={place}
            style={[styles.input, styles.inputSizePlace]}
            placeholder="Place"
            multiline
            blurOnSubmit
            returnKeyType="done"
            maxLength={10}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              setPlaceId('0');
              setPlace(text);
            }}
          />
          <Button
            title="search"
            onPress={() => {
              setPlace('');
              setSearchModalVisible(!searchModalVisible);
            }}
          />
        </View>
      )}
      {(!calandarEnable || homeThemes.conditionInput.enable === true) === true && (
        <View style={{ flexDirection: 'row', paddingRight: 35, alignItems: 'center' }}>
          <FontAwesome name="heartbeat" size={28} color="black" />
          <Rating
            type="heart"
            ratingCount={5}
            imageSize={40}
            startingValue={condition}
            // showRating
            onStartRating={() => {
              console.log('start');
            }}
            onFinishRating={(rating) => ratingCompleted(rating)}
          />
        </View>
      )}
    </View>
  ) : null;
}

ScoreInput.propTypes = {
  addScoreData: PropTypes.func.isRequired,
  calandarEnable: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
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
});
