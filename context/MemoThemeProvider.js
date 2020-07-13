/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import MemoThemeContext from './MemoThemeContext';

const MemoThemeProvider = ({ children }) => {
  const changeTheme = () => {
    setMemoTheme((prevState) => {
      const is = prevState.theme === 'bright';
      const nextTheme = is ? 'dark' : 'bright';
      return {
        ...prevState,
        // theme: prevState.theme === 'bright' ? 'dark' : 'bright',
        theme: nextTheme,
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
