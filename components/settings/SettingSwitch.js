/* eslint-disable no-use-before-define */
import React, { useState, useContext } from 'react';
import { Text, View, Switch } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export default function SettingSwitch(props) {
  const { keyString, id, name, enable, toggleFunc, kind } = props;
  console.log(props);
  return (
    <View style={styles.row}>
      <Text style={styles.textStyle}>{name}</Text>
      <Switch
        trackColor={{ false: '#767577', true: 'green' }}
        thumbColor={enable ? '#f4f3f4' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          if (kind === 'Home') {
            toggleFunc(keyString);
          } else if (kind === 'Stats') {
            toggleFunc(id);
          }

          // toggleDayChart();
        }}
        value={enable}
      />
    </View>
  );
}

SettingSwitch.propTypes = {
  keyString: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  enable: PropTypes.bool.isRequired,
  toggleFunc: PropTypes.func.isRequired,
  kind: PropTypes.string.isRequired,
};
