import { createContext } from 'react';

const HomeThemeContext = createContext({
  homeThemes: {},
  toggleHome: () => {},
});

export default HomeThemeContext;
