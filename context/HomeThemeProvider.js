/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import HomeThemeContext from './HomeThemeContext';

export async function loadHomeThemeDatas() {
  let homeThemeDatas = {};
  try {
    const datas = await AsyncStorage.getItem('HomeThemeDatas');
    // console.log('datas', datas);
    const parsedToDos = JSON.parse(datas);
    // console.log('parsedToDos', parsedToDos);
    if (parsedToDos === null) {
      homeThemeDatas = {};
    } else {
      homeThemeDatas = parsedToDos;
    }
  } catch (err) {
    console.log(err);
  }
  return homeThemeDatas;
}

const HomeThemeProvider = ({ children }) => {
  const toggleFunc = (key) => {
    console.log(key);
    setHomeTheme((prevState) => {
      console.log(prevState);
      const prevEnable = prevState.homeThemes[key].enable;
      const newState = {
        ...prevState,
        homeThemes: {
          ...prevState.homeThemes,
          [key]: { ...prevState.homeThemes[key], enable: !prevEnable },
        },
      };
      AsyncStorage.setItem('HomeThemeDatas', JSON.stringify(newState));
      return newState;
    });
  };

  const initialState = {
    homeThemes: {
      scoreInput: {
        id: 0,
        enable: false,
        name: '점수 입력 고정 사용',
      },
      placeInput: {
        id: 1,
        enable: false,
        name: '장소 입력 고정 사용',
      },
      conditionInput: {
        id: 2,
        enable: false,
        name: '컨디션 입력 고정 사용',
      },
      popupInput: {
        id: 3,
        enable: false,
        name: '팝업 점수입력 사용',
      },
    },
    toggleFunc,
  };

  const [homeTheme, setHomeTheme] = useState({});

  useEffect(() => {
    console.log('HomeThemeProvider.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadHomeThemeDatas();
      // console.log(articleData);
      const loadState = {
        ...initialState,
        homeThemes: loadDatas.homeThemes,
      };
      setHomeTheme(loadState);
    };
    fetchData();
  }, []);

  return <HomeThemeContext.Provider value={homeTheme}>{children}</HomeThemeContext.Provider>;
};

export default HomeThemeProvider;
