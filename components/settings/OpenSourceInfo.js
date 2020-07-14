/* eslint-disable no-use-before-define */
import * as React from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OpenSourceInfo() {
  return (
    <View style={{ paddingLeft: 15 }}>
      <ScrollView style={{ paddingLeft: 10 }} horizontal>
        <ScrollView>
          <Text style={styles.mainText}>WIX/react-native-calendar</Text>
          <Text>https://github.com/wix/react-native-calendars</Text>
          <Text>Copyright (c) 2017 Wix.com</Text>
          <Text>MIT License</Text>

          <Text style={styles.mainText}>expo</Text>
          <Text>https://github.com/expo/expo</Text>
          <Text>Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)</Text>
          <Text>MIT License</Text>

          <Text style={styles.mainText}>uuid</Text>
          <Text>https://github.com/uuidjs/uuid</Text>
          <Text>Copyright (c) 2010-2020 Robert Kieffer and other contributors</Text>
          <Text>MIT License</Text>

          <Text style={styles.mainText}>react-native-elements</Text>
          <Text>https://github.com/react-native-elements/react-native-elements</Text>
          <Text>Copyright (c) 2016 Nader Dabit</Text>
          <Text>MIT License</Text>

          <Text style={styles.mainText}>react-native-table-component</Text>
          <Text>https://github.com/Gil2015/react-native-table-component</Text>
          <Text>Copyright (c) 2018 鸡斯拉</Text>
          <Text>MIT License</Text>

          <Text style={styles.mainText}>react-navigation</Text>
          <Text>https://github.com/react-navigation/react-navigation</Text>
          <Text>https://reactnavigation.org/</Text>
          <Text>MIT Licence</Text>

          <Text style={styles.mainText}>react-native-chart</Text>
          <Text>https://www.npmjs.com/package/react-native-chart-kit</Text>
          <Text>None</Text>

          <Text style={styles.mainText}>react-native-floating button</Text>
          <Text>https://github.com/santomegonzalo/react-native-floating-action </Text>
          <Text>Copyright (c) 2017 Gonzalo Santome</Text>
          <Text>MIT License</Text>
        </ScrollView>
      </ScrollView>
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
