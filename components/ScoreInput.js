/* eslint-disable no-use-before-define */
import * as React from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class ScoreInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: '',
    };
  }

  render() {
    console.log('ScoreInput render');

    const { score } = this.state;
    const { saveScore, addScoreData } = this.props;
    return (
      <View style={styles.container}>
        <FontAwesome5 name="bowling-ball" size={35} />
        {/* <MyCalendar/> */}
        <TextInput
          // value={score == "-" ? null : score}
          value={score}
          style={styles.input}
          placeholder="Score"
          underlineColorAndroid="transparent"
          keyboardType="numeric"
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
            this.setState({
              score: returnScore,
            });
          }}
        />
        <AntDesign
          name="enter"
          size={35}
          color="black"
          onPress={() => {
            this.setState({
              score: '',
            });

            addScoreData();
          }}
        />
      </View>
    );
  }
}

ScoreInput.propTypes = {
  saveScore: PropTypes.func.isRequired,
  addScoreData: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width / 4.5,
    borderColor: 'black',
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 25,
    textAlign: 'center',
  },
});
