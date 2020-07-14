/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Button, View, Switch, Dimensions } from 'react-native';
import StatsThemeContext from '../../context/StatsThemeContext';

const { width, height } = Dimensions.get('window');

export default function StatsSettings() {
  const {
    entireTableEnable,
    recentTableEnable,
    yearChartEnable,
    monthChartEnable,
    dayChartEnable,
    toggleEntireTable,
    toggleRecentTable,
    toggleYearChart,
    toggleMonthChart,
    toggleDayChart,
  } = useContext(StatsThemeContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.row}>
        <Button title="전체 통계 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={entireTableEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEntireTable}
          value={entireTableEnable}
        />
      </View>
      <View style={styles.row}>
        <Button title="최근 통계 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={recentTableEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleRecentTable}
          value={recentTableEnable}
        />
      </View>
      <View style={styles.row}>
        <Button title="년 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={yearChartEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleYearChart}
          value={yearChartEnable}
        />
      </View>
      <View style={styles.row}>
        <Button title="달 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={monthChartEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMonthChart}
          value={monthChartEnable}
        />
      </View>
      <View style={styles.row}>
        <Button title="일 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={dayChartEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDayChart}
          value={dayChartEnable}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  mainText: { margin: 6, height: 40, fontSize: 30 },
  row: {
    flexDirection: 'row',
  },
});
