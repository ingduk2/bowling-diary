/* eslint-disable no-use-before-define */
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// const { width, height } = Dimensions.get('window');

export default function StatsSettings() {
  return (
    <View>
      <Text>StatsSettings</Text>
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
