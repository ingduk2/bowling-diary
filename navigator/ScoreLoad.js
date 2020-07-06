import { AsyncStorage } from 'react-native';

export default async function loadScoreDatas() {
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
