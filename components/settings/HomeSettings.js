/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import HomeThemeContext from '../../context/HomeThemeContext';
import styles from './style';

// const { width, height } = Dimensions.get('window');

export default function HomeSettings() {
  const { homeThemes, toggleHome } = useContext(HomeThemeContext);
  console.log(homeThemes.scoreInput.enable);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {Object.entries(homeThemes)
        .sort((a, b) => a[1].index - b[1].index)
        .map(([key, value]) => {
          // console.log(key, value);
          return (
            <View style={styles.row}>
              <Text style={styles.textStyle}>{value.name}</Text>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                thumbColor={value.enable ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleHome(key);
                }}
                value={value.enable}
              />
            </View>
          );
        })}
      {/* <View style={styles.row}>
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
        /> */}
      {/* </View> */}
    </View>
  );
}
