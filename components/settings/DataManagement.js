/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import firebase from '../../constants/FireBaseInit';
// import * as firebase from 'firebase';
// import 'firebase/firestore';

export default function DataManagement() {
  useEffect(() => {}, []);

  //   console.log(firestore.firestore());
  //   console.log(firebase);
  //   const db = firebase.firestore();
  //   console.log(db);
  //   db.collection('users')
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => ${doc.data()}`);
  //       });
  //     });

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        styles={{
          flex: 2,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>점수 데이터 클라우드 저장</Text>
        <Text>점수 데이터 클라우드 불러오기</Text>
        <Text>메모 데이터 클라우드 저장</Text>
        <Text>메모 데이터 클라우드 불러오기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  mainText: { margin: 6, height: 40, fontSize: 30 },
});
