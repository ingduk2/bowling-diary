/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import HomeThemeContext from '../../context/HomeThemeContext';
import styles from './style';

// const { width, height } = Dimensions.get('window');

export default function HomeSettings() {
  const {
    scoreInputEnable,
    locationInputEnable,
    conditionInputEnable,
    scorePopupEnable,
    toggleScoreInput,
    toggleLocationInput,
    toggleConditionInput,
    toggleScorePopupEnable,
  } = useContext(HomeThemeContext);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>점수 입력 고정 사용</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={scoreInputEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleScoreInput}
          value={scoreInputEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>장소 입력 고정 사용</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={locationInputEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLocationInput}
          value={locationInputEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>컨디션 입력 고정 사용</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={conditionInputEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleConditionInput}
          value={conditionInputEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>팝업 점수입력 사용</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={scorePopupEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleScorePopupEnable}
          value={scorePopupEnable}
        />
      </View>
    </View>
  );
}
