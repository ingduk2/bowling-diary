/* eslint-disable no-use-before-define */
import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

// const { width, height } = Dimensions.get('window');

export default function OpenSourceInfo() {
  return (
    <View>
      <ScrollView>
        <Text style={styles.mainText}>WIX/react-native-calendar</Text>
        <Text>The MIT License (MIT) Copyright (c) 2017 Wix.com</Text>

        <Text style={styles.mainText}>expo</Text>
        <Text>
          The MIT License (MIT) Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)
        </Text>

        <Text style={styles.mainText}>uuid</Text>
        <Text>
          The MIT License (MIT) Copyright (c) 2010-2020 Robert Kieffer and other contributors
        </Text>

        <Text style={styles.mainText}>react-native-elements</Text>
        <Text>MIT License</Text>

        <Text style={styles.mainText}>react-table</Text>
        <Text>MIT License Copyright (c) 2018 鸡斯拉 Permission is hereby granted</Text>
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
