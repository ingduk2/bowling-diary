/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export default function SettingSwitch(props) {
  const { id, name, enable, toggleStats } = props;
  console.log(props);
  return (
    <View style={styles.row}>
      <Text style={styles.textStyle}>{name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: 'green' }}
        thumbColor={enable ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          toggleStats(id);
          // toggleDayChart();
        }}
        value={enable}
      />
    </View>
  );
}

SettingSwitch.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  enable: PropTypes.bool.isRequired,
  toggleStats: PropTypes.func.isRequired,
};
