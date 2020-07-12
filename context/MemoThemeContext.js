import { createContext } from 'react';

const MemoThemeContext = createContext({
  theme: 'bright',
  changeTheme: () => {},
});

export default MemoThemeContext;
