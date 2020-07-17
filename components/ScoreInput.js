/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { FontAwesome5, AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import HomeThemeContext from '../context/HomeThemeContext';
import { Rating, AirbnbRating } from 'react-native-elements';

const { width } = Dimensions.get('window');

export default function ScoreInput(props) {
  const { saveScore, addScoreData, savePlace } = props;
  const [score, setScore] = useState('');
  const [place, setPlace] = useState('');
  const { locationInputEnable } = useContext(HomeThemeContext);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <FontAwesome5 name="bowling-ball" size={35} />
        {/* <MyCalendar/> */}
        <TextInput
          // value={score == "-" ? null : score}
          value={score}
          style={styles.input}
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
            saveScore(returnScore);
            setScore(returnScore);
          }}
        />
        <AntDesign
          style={{ backgroundColor: 'red' }}
          name="enter"
          size={35}
          color="black"
          onPress={() => {
            setScore('');
            addScoreData();
          }}
        />
        {/* <MaterialIcons name="place" size={35} color="black" onPress={() => {}} /> */}
        {/* <Entypo name="plus" size={35} color="black" /> */}
      </View>
      {locationInputEnable === true && (
        <View style={{ flexDirection: 'row', paddingRight: 35 }}>
          <MaterialIcons name="place" size={35} color="black" />
          <TextInput
            value={place}
            style={styles.input}
            placeholder="Place"
            multiline
            maxLength={10}
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              savePlace(text);
              setPlace(text);
            }}
          />
        </View>
      )}
    </View>
  );
}

ScoreInput.propTypes = {
  saveScore: PropTypes.func.isRequired,
  addScoreData: PropTypes.func.isRequired,
  savePlace: PropTypes.func.isRequired,
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
});
