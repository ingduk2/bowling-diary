import { createContext } from 'react';

const HomeThemeContext = createContext({
  locationInputEnable: true,
  toggleLocationInput: () => {},
});

export default HomeThemeContext;
