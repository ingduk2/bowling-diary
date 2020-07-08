import { AsyncStorage } from 'react-native';
import { useState, useEffect } from 'react';

export async function loadScoreDatas() {
  let scoreDatas = {};
  try {
    const datas = await AsyncStorage.getItem('scoreDatas');
    // console.log("datas", datas);
    const parsedToDos = JSON.parse(datas);
    // console.log("parsedToDos", parsedToDos);
    if (parsedToDos == null) {
      scoreDatas = {};
    } else {
      scoreDatas = parsedToDos;
    }
    // scoreDatas = (parsedToDos == null) ? {} : parsedToDos ;
    //                  datas == null ? {} : datas
    // console.log("scoreDatas" , scoreDatas);
  } catch (err) {
    console.log(err);
  }
  return scoreDatas;
}

export const useScoreData = () => {
  const [datas, setData] = useState({});

  useEffect(() => {
    console.log('ScoreLoads.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadScoreDatas();
      // console.log(articleData);
      setData(loadDatas);
    };
    fetchData();
  }, []);

  return [datas, setData];
};
