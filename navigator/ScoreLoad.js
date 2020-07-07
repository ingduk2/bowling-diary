import { AsyncStorage, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

export const useScoreData = () => {
    const [datas, setData] = useState({});

    useEffect(() => {
        console.log("ScoreLoads.useEffect");
        const fetchData = async () => {
            const datas = await loadScoreDatas();
            // console.log(articleData);
            setData(datas)
        }
        fetchData();
    }, []);

    return [datas, setData]
}

export async function loadScoreDatas() {
    let scoreDatas = {};
    try {
        const datas = await AsyncStorage.getItem("scoreDatas");
        // console.log("datas", datas);
        const parsedToDos = JSON.parse(datas);
        // console.log("parsedToDos", parsedToDos);
        if (parsedToDos == null) {
            scoreDatas = {};
        } else {
            scoreDatas = parsedToDos
        }
        // scoreDatas = (parsedToDos == null) ? {} : parsedToDos ;
        //                  datas == null ? {} : datas
        // console.log("scoreDatas" , scoreDatas);
    } catch (err) {
        console.log(err);
    }
    return scoreDatas;
}

