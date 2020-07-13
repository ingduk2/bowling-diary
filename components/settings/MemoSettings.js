/* eslint-disable no-use-before-define */
import * as React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import MemoThemeContext from '../../context/MemoThemeContext';

export default function MemoSettings() {
  const { theme, changeTheme } = React.useContext(MemoThemeContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>MemoSettings</Text>
      <Text>{theme}</Text>
      <Button
        title="Dark Theme"
        onPress={() => {
          changeTheme();
        }}
      />
      <Button title="white Theme" onPress={() => Alert.alert('white')} />
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
});
