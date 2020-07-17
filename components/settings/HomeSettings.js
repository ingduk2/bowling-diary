/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import HomeThemeContext from '../../context/HomeThemeContext';
import styles from './style';

// const { width, height } = Dimensions.get('window');

export default function HomeSettings() {
  const { locationInputEnable, toggleLocationInput } = useContext(HomeThemeContext);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>장소 입력 사용</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={locationInputEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLocationInput}
          value={locationInputEnable}
        />
      </View>
    </View>
  );
}
