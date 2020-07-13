import { createContext } from 'react';

const HomeThemeContext = createContext({
  theme: 'bright',
  changeTheme: () => {},
});

export default HomeThemeContext;
