/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import MemoThemeContext from './MemoThemeContext';

const MemoThemeProvider = ({ children }) => {
  const changeTheme = () => {
    setMemoTheme((prevState) => {
      return {
        ...prevState,
        theme: prevState.theme === 'bright' ? 'dark' : 'bright',
      };
    });
  };

  const initialState = {
    theme: 'bright',
    changeTheme,
  };
  const [memoTheme, setMemoTheme] = useState(initialState);

  return <MemoThemeContext.Provider value={memoTheme}>{children}</MemoThemeContext.Provider>;
};

export default MemoThemeProvider;
