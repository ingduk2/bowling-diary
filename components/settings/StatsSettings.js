/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, Button, View, Switch, Dimensions } from 'react-native';
import SettingSwitch from './SettingSwitch';
import StatsThemeContext from '../../context/StatsThemeContext';
import styles from './style';

export default function StatsSettings() {
  const { array, toggleFunc } = useContext(StatsThemeContext);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {array.map((data) => {
        return (
          <SettingSwitch
            key={data.id}
            toggleFunc={toggleFunc}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...data}
            kind="Stats"
            keyString="keyString"
          />
        );
      })}
    </View>
  );
}
