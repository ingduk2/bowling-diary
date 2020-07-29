import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import firebase from '../../constants/FireBaseInit';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
import styles from './style';

const localDataName = {
  score: 'scoreDatas',
  login: 'LoginInfo',
  memo: 'memoDatas',
};

const db = firebase.firestore();

export default function DataManagement() {
  const [uid, setUid] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let loadloginInfo = {};
      const loadDatas = await AsyncStorage.getItem(localDataName.login);
      if (loadDatas !== null) {
        setUid(JSON.parse(loadDatas).uid);
      }
    };
    fetchData();
  }, []);
  console.log('uid', uid);

  const scoreDataCloudSave = async () => {
    const localScoreData = await AsyncStorage.getItem(localDataName.score);
    const parsedData = JSON.parse(localScoreData);
    await setIsLoading(true);
    await db
      .collection('scores')
      .doc(uid)
      .set({
        parsedData,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
    await setIsLoading(false);
  };

  const scoreDataCloudLoad = async () => {
    // get Data from firestore;
    await setIsLoading(true);

    await db
      .collection('scores')
      .doc(uid)
      .get()
      .then((doc) => {
        console.log(doc.data().parsedData);
        //save local Storage
        AsyncStorage.setItem(localDataName.score, JSON.stringify(doc.data().parsedData));
      })
      .catch((error) => {
        console.error('Error Loading document: ', error);
      });

    await setIsLoading(false);
  };

  const memoDataCloudSave = async () => {
    const localMemoData = await AsyncStorage.getItem(localDataName.memo);
    const parsedData = JSON.parse(localMemoData);
    await setIsLoading(true);
    await db
      .collection('memos')
      .doc(uid)
      .set({
        parsedData,
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
    await setIsLoading(false);
  };

  const memoDataCloudLoad = async () => {
    // get Data from firestore;
    await setIsLoading(true);

    await db
      .collection('memos')
      .doc(uid)
      .get()
      .then((doc) => {
        console.log(doc.data().parsedData);
        //save local Storage
        AsyncStorage.setItem(localDataName.memo, JSON.stringify(doc.data().parsedData));
      })
      .catch((error) => {
        console.error('Error Loading document: ', error);
      });

    await setIsLoading(false);
  };

  const options = {
    scoresave: {
      alertTitle: '클라우드 점수 데이터 저장',
      alertContent: '클라우드에 점수 데이터를 저장합니다.',
      func: scoreDataCloudSave,
    },
    scoreload: {
      alertTitle: '클라우드 점수 데이터 불러오기',
      alertContent: '클라우드에서 데이터를 불러옵니다. 기존의 데이터는 덮어씌워집니다.',
      func: scoreDataCloudLoad,
    },
    memosave: {
      alertTitle: '클라우드 메모 데이터 저장',
      alertContent: '클라우드에 메모 데이터를 저장합니다.',
      func: memoDataCloudSave,
    },
    memoload: {
      alertTitle: '클라우드 메모 데이터 불러오기',
      alertContent: '클라우드에서 데이터를 불러옵니다. 기존의 데이터를 덮어씌워집니다.',
      func: memoDataCloudLoad,
    },
  };

  const createTwoButtonAlert = (selected) =>
    Alert.alert(
      selected.alertTitle,
      selected.alertContent,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => selected.func(),
        },
      ],
      { cancelable: false },
    );

  const task = (kind) => {
    const selected = options[kind];
    console.log(selected);
    createTwoButtonAlert(selected);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          task('scoresave');
        }}
      >
        <View style={styles.row}>
          <Text style={styles.textStyle}>점수 데이터 클라우드 저장</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          task('scoreload');
        }}
      >
        <View style={styles.row}>
          <Text style={styles.textStyle}>점수 데이터 클라우드 불러오기</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          task('memosave');
        }}
      >
        <View style={styles.row}>
          <Text style={styles.textStyle}>메모 데이터 클라우드 저장</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          task('memoload');
        }}
      >
        <View style={styles.row}>
          <Text style={styles.textStyle}>메모 데이터 클라우드 불러오기</Text>
        </View>
      </TouchableOpacity>
      {isLoading ? <Text>Loading</Text> : <Text>...</Text>}
    </View>
  );
}
