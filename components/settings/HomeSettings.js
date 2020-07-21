/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { Text, View, Switch } from 'react-native';
import SettingSwitch from './SettingSwitch';
import HomeThemeContext from '../../context/HomeThemeContext';
import styles from './style';

// const { width, height } = Dimensions.get('window');

export default function HomeSettings() {
  const { homeThemes, toggleFunc } = useContext(HomeThemeContext);
  // console.log(homeThemes.scoreInput.enable);
  console.log(homeThemes);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {Object.entries(homeThemes)
        .sort((a, b) => a[1].id - b[1].id)
        .map(([key, value]) => {
          // console.log(key, value);

          return (
            <SettingSwitch
              key={key}
              toggleFunc={toggleFunc}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...value}
              kind="Home"
              keyString={key}
            />
          );
        })}
    </View>
  );
}
