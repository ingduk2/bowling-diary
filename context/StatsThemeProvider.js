import React, { useState } from 'react';
import StatsThemeContext from './StatsThemeContext';

// eslint-disable-next-line react/prop-types
const StatsThemeProvider = ({ children }) => {
  const toggleEntireTable = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      return {
        ...prevState,
        entireTableEnable: !prevState.entireTableEnable,
      };
    });
  };

  const toggleRecentTable = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      return {
        ...prevState,
        recentTableEnable: !prevState.recentTableEnable,
      };
    });
  };

  const toggleYearChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      return {
        ...prevState,
        yearChartEnable: !prevState.yearChartEnable,
      };
    });
  };

  const toggleMonthChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
      return {
        ...prevState,
        monthChartEnable: !prevState.monthChartEnable,
      };
    });
  };

  const toggleDayChart = () => {
    // eslint-disable-next-line no-use-before-define
    setStatsTheme((prevState) => {
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

  const [statsTheme, setStatsTheme] = useState(initialState);

  return <StatsThemeContext.Provider value={statsTheme}>{children}</StatsThemeContext.Provider>;
};

export default StatsThemeProvider;
