/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import HomeThemeContext from './HomeThemeContext';

const HomeThemeProvider = ({ children }) => {
  const toggleLocationInput = () => {
    setHomeTheme((prevState) => {
      return {
        ...prevState,
        locationInputEnable: !prevState.locationInputEnable,
      };
    });
  };

  const initialState = {
    locationInputEnable: true,
    toggleLocationInput,
  };

  const [homeTheme, setHomeTheme] = useState(initialState);

  return <HomeThemeContext.Provider value={homeTheme}>{children}</HomeThemeContext.Provider>;
};

export default HomeThemeProvider;
