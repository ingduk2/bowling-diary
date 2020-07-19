/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import StatsThemeContext from './StatsThemeContext';
import { array } from 'prop-types';

export async function loadStatsThemeDatas() {
  let statsThemeDatas = {};
  try {
    const datas = await AsyncStorage.getItem('StatsThemeDatas');
    console.log('datas', datas);
    const parsedToDos = JSON.parse(datas);
    console.log('parsedToDos', parsedToDos);
    if (parsedToDos == null) {
      statsThemeDatas = {
        entireTableEnable: true,
        recentTableEnable: true,
        yearChartEnable: true,
        monthChartEnable: true,
        dayChartEnable: true,
      };
    } else {
      statsThemeDatas = parsedToDos;
    }
  } catch (err) {
    console.log(err);
  }
  return statsThemeDatas;
}

const StatsThemeProvider = ({ children }) => {
  const toggleStats = (id) => {
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
    ],
  };

  useEffect(() => {
    console.log('StatsThemeProvider.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadStatsThemeDatas();
      // console.log('loadDatas', loadDatas);
      const loadState = {
        ...initialState,
        array: loadDatas.array,
        toggleStats,
      };
      setStatsTheme(loadState);
    };
    fetchData();
  }, []);

  return <StatsThemeContext.Provider value={statsTheme}>{children}</StatsThemeContext.Provider>;
};

export default StatsThemeProvider;
