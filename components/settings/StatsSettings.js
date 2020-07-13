/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import { CheckBox } from 'react-native-elements';

// const { width, height } = Dimensions.get('window');

export default function StatsSettings() {
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);
  const toggleSwitch5 = () => setIsEnabled5((previousState) => !previousState);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.row}>
        <Button title="전체 통계 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isEnabled1 ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch1}
          value={isEnabled1}
        />
      </View>
      <View style={styles.row}>
        <Button title="최근 통계 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isEnabled2 ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch2}
          value={isEnabled2}
        />
      </View>
      <View style={styles.row}>
        <Button title="년 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isEnabled3 ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch3}
          value={isEnabled3}
        />
      </View>
      <View style={styles.row}>
        <Button title="달 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isEnabled4 ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch4}
          value={isEnabled4}
        />
      </View>
      <View style={styles.row}>
        <Button title="일 차트 On Off" />
        <Switch
          trackColor={{ false: '#767577', true: 'green' }}
          thumbColor={isEnabled5 ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch5}
          value={isEnabled5}
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
