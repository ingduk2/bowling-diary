/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import StatsThemeContext from './StatsThemeContext';

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
  // const datas = loadStatsThemeDatas();
  // const parsedToDos = JSON.parse(datas);

  const toggleEntireTable = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      const newState = {
        ...prevState,
        entireTableEnable: !prevState.entireTableEnable,
      };
      console.log(newState);
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        entireTableEnable: !prevState.entireTableEnable,
      };
    });
  };

  const toggleRecentTable = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      const newState = {
        ...prevState,
        recentTableEnable: !prevState.recentTableEnable,
      };
      console.log(newState);
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        recentTableEnable: !prevState.recentTableEnable,
      };
    });
  };

  const toggleYearChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      const newState = {
        ...prevState,
        yearChartEnable: !prevState.yearChartEnable,
      };
      console.log(newState);
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        yearChartEnable: !prevState.yearChartEnable,
      };
    });
  };

  const toggleMonthChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      const newState = {
        ...prevState,
        monthChartEnable: !prevState.monthChartEnable,
      };
      console.log(newState);
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        monthChartEnable: !prevState.monthChartEnable,
      };
    });
  };

  const toggleDayChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      const newState = {
        ...prevState,
        dayChartEnable: !prevState.dayChartEnable,
      };
      console.log(newState);
      AsyncStorage.setItem('StatsThemeDatas', JSON.stringify(newState));
      return {
        ...prevState,
        dayChartEnable: !prevState.dayChartEnable,
      };
    });
  };

  const initialState = {
    entireTableEnable: true,
    recentTableEnable: true,
    yearChartEnable: true,
    monthChartEnable: true,
    dayChartEnable: true,
    toggleEntireTable,
    toggleRecentTable,
    toggleYearChart,
    toggleMonthChart,
    toggleDayChart,
  };

  const [statsTheme, setStatsTheme] = useState({});

  useEffect(() => {
    console.log('StatsThemeProvider.useEffect');
    const fetchData = async () => {
      const loadDatas = await loadStatsThemeDatas();
      // console.log(articleData);
      const loadState = {
        ...initialState,
        entireTableEnable: loadDatas.entireTableEnable,
        recentTableEnable: loadDatas.recentTableEnable,
        yearChartEnable: loadDatas.yearChartEnable,
        monthChartEnable: loadDatas.monthChartEnable,
        dayChartEnable: loadDatas.dayChartEnable,
        toggleEntireTable,
        toggleRecentTable,
        toggleYearChart,
        toggleMonthChart,
        toggleDayChart,
      };
      setStatsTheme(loadState);
    };
    fetchData();
  }, []);

  return <StatsThemeContext.Provider value={statsTheme}>{children}</StatsThemeContext.Provider>;
};

export default StatsThemeProvider;
