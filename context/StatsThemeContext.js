import { createContext } from 'react';

const StatsThemeContext = createContext({
  theme: 'bright',
  changeTheme: () => {},
});

export default StatsThemeContext;
