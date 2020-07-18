import { createContext } from 'react';

const HomeThemeContext = createContext({
  scoreInputEnable: true,
  locationInputEnable: true,
  conditionInputEnable: true,
  scorePopupEnable: true,
  toggleScoreInput: () => {},
  toggleLocationInput: () => {},
  toggleConditionInput: () => {},
  toggleScorePopupEnable: () => {},
});

export default HomeThemeContext;
