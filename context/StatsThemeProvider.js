/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import StatsThemeContext from './StatsThemeContext';

export async function loadStatsThemeDatas() {
  let statsThemeDatas = null;
  try {
    const datas = await AsyncStorage.getItem('StatsThemeDatas');
    // console.log('datas', datas);
    const parsedToDos = JSON.parse(datas);
    // console.log('parsedToDos', parsedToDos);
    if (parsedToDos == null) {
      // statsThemeDatas = {};
    } else {
      statsThemeDatas = parsedToDos;
    }
  } catch (err) {
    console.log(err);
  }
  return statsThemeDatas;
}

const StatsThemeProvider = ({ children }) => {
  const toggleFunc = (id) => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      // console.log(JSON.stringify(prevState));

      const prevArr = prevState.array;
      const current = prevArr[id].enable;
      prevArr[id].enable = !current;
      // console.log(prevArr);

      const newState = {
        ...prevState,
        aray: prevArr,
      };
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return newState;
    });
  };

  const [statsTheme, setStatsTheme] = useState({});

  const initialState = {
    array: [
      {
        id: 0,
        enable: true,
        name: '전체 통계 On Off',
      },
      {
        id: 1,
        enable: true,
        name: '최근 통계 On Off',
      },
      {
        id: 2,
        enable: true,
        name: '년 차트 On Off',
      },
      {
        id: 3,
        enable: true,
        name: '달 차트 On Off',
      },
      {
        id: 4,
        enable: true,
        name: '일 차트 On Off',
      },
      {
        id: 5,
        enable: true,
        name: '장소별 통계',
      },
    ],
  };

  useEffect(() => {
    console.log('StatsThemeProvider.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadStatsThemeDatas();
      console.log('loadDatas', loadDatas);

      const loadState = {
        ...initialState,
        array: loadDatas ? loadDatas.array : initialState.array,
        toggleFunc,
      };
      setStatsTheme(loadState);
    };
    fetchData();
  }, []);

  return <StatsThemeContext.Provider value={statsTheme}>{children}</StatsThemeContext.Provider>;
};

export default StatsThemeProvider;
