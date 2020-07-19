import { createContext } from 'react';

const StatsThemeContext = createContext({
  array: [],
  toggleStats: () => {},
});

export default StatsThemeContext;
