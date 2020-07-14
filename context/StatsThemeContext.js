import { createContext } from 'react';

const StatsThemeContext = createContext({
  entireTableEnable: true,
  recentTableEnable: true,
  yearChartEnable: true,
  monthChartEnable: true,
  dayChartEnable: true,
  toggleEntireTable: () => {},
  toggleRecentTable: () => {},
  toggleYearChart: () => {},
  toggleMonthChart: () => {},
  toggleDayChart: () => {},
});

export default StatsThemeContext;
