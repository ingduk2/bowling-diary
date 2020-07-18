/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Dimensions, Alert } from 'react-native';
import { FontAwesome5, AntDesign, MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { Rating, AirbnbRating } from 'react-native-elements';
import HomeThemeContext from '../context/HomeThemeContext';

const { width } = Dimensions.get('window');

export default function ScoreInput(props) {
  const { saveScore, addScoreData, savePlace, saveCondition, calandarEnable } = props;
  const [score, setScore] = useState('');
  const [place, setPlace] = useState('');
  const [condition, setCondition] = useState(5);
  const { scoreInputEnable, locationInputEnable, conditionInputEnable } = useContext(
    HomeThemeContext,
  );

  const ratingCompleted = (rating) => {
    console.log(rating);
    setCondition(rating);
    saveCondition(rating);
  };
  return (
    <View style={styles.container}>
      {(!calandarEnable || scoreInputEnable === true) && (
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome5 name="bowling-ball" size={35} />
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
              saveScore(returnScore);
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
              addScoreData();
            }}
          />
          {/* <MaterialIcons name="place" size={35} color="black" onPress={() => {}} /> */}
          {/* <Entypo name="plus" size={35} color="black" /> */}
        </View>
      )}
      {(!calandarEnable || locationInputEnable === true) === true && (
        <View style={{ flexDirection: 'row', paddingRight: 35 }}>
          <MaterialIcons name="place" size={35} color="black" />
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
              savePlace(text);
              setPlace(text);
            }}
          />
        </View>
      )}
      {(!calandarEnable || conditionInputEnable === true) === true && (
        <View style={{ flexDirection: 'row', paddingRight: 35, alignItems: 'center' }}>
          <FontAwesome name="heartbeat" size={35} color="black" />
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
  );
}

ScoreInput.propTypes = {
  saveScore: PropTypes.func.isRequired,
  addScoreData: PropTypes.func.isRequired,
  savePlace: PropTypes.func.isRequired,
  saveCondition: PropTypes.func.isRequired,
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
