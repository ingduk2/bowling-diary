/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Button, View, Switch, Dimensions } from 'react-native';
import StatsThemeContext from '../../context/StatsThemeContext';
import styles from './style';

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
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.row}>
        <Text style={styles.textStyle}>전체 통계 On Off</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={entireTableEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleEntireTable}
          value={entireTableEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>최근 통계 On Off</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={recentTableEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleRecentTable}
          value={recentTableEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>년 차트 On Off</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={yearChartEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleYearChart}
          value={yearChartEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>달 차트 On Off</Text>
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={monthChartEnable ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMonthChart}
          value={monthChartEnable}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.textStyle}>일 차트 On Off</Text>
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
