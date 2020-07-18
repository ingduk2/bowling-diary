/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import HomeThemeContext from './HomeThemeContext';

export async function loadHomeThemeDatas() {
  let homeThemeDatas = {};
  try {
    const datas = await AsyncStorage.getItem('HomeThemeDatas');
    console.log('datas', datas);
    const parsedToDos = JSON.parse(datas);
    console.log('parsedToDos', parsedToDos);
    if (parsedToDos == null) {
      homeThemeDatas = {
        scoreInputEnable: true,
        locationInputEnable: true,
        conditionInputEnable: true,
        scorePopupEnable: true,
      };
    } else {
      homeThemeDatas = parsedToDos;
    }
  } catch (err) {
    console.log(err);
  }
  return homeThemeDatas;
}

const HomeThemeProvider = ({ children }) => {
  const toggleLocationInput = () => {
    setHomeTheme((prevState) => {
      const newState = {
        ...prevState,
        locationInputEnable: !prevState.locationInputEnable,
      };
      AsyncStorage.setItem('HomeThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        locationInputEnable: !prevState.locationInputEnable,
      };
    });
  };

  const toggleScoreInput = () => {
    setHomeTheme((prevState) => {
      const newState = {
        ...prevState,
        scoreInputEnable: !prevState.scoreInputEnable,
      };
      AsyncStorage.setItem('HomeThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        scoreInputEnable: !prevState.scoreInputEnable,
      };
    });
  };

  const toggleConditionInput = () => {
    setHomeTheme((prevState) => {
      const newState = {
        ...prevState,
        conditionInputEnable: !prevState.conditionInputEnable,
      };
      AsyncStorage.setItem('HomeThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        conditionInputEnable: !prevState.conditionInputEnable,
      };
    });
  };

  const toggleScorePopupEnable = () => {
    setHomeTheme((prevState) => {
      const newState = {
        ...prevState,
        scorePopupEnable: !prevState.scorePopupEnable,
      };
      AsyncStorage.setItem('HomeThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        scorePopupEnable: !prevState.scorePopupEnable,
      };
    });
  };

  const initialState = {
    scoreInputEnable: true,
    locationInputEnable: true,
    conditionInputEnable: true,
    scorePopupEnable: true,
    toggleScoreInput,
    toggleLocationInput,
    toggleConditionInput,
    toggleScorePopupEnable,
  };

  const [homeTheme, setHomeTheme] = useState({});

  useEffect(() => {
    console.log('HomeThemeProvider.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadHomeThemeDatas();
      // console.log(articleData);
      const loadState = {
        ...initialState,
        scoreInputEnable: loadDatas.scoreInputEnable,
        locationInputEnable: loadDatas.locationInputEnable,
        conditionInputEnable: loadDatas.conditionInputEnable,
        scorePopupEnable: loadDatas.scorePopupEnable,
      };
      setHomeTheme(loadState);
    };
    fetchData();
  }, []);

  return <HomeThemeContext.Provider value={homeTheme}>{children}</HomeThemeContext.Provider>;
};

export default HomeThemeProvider;
