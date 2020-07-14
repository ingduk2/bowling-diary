/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Chart from './chart';
import EntireTable from './entireTable';
import RecentTable from './recentTable';
import ChartDay from './chartDay';
import ChartMonth from './chartMonth';
import StatsThemeContext from '../../context/StatsThemeContext';

export default function Stats(props) {
  const {
    entireTableEnable,
    recentTableEnable,
    yearChartEnable,
    monthChartEnable,
    dayChartEnable,
  } = useContext(StatsThemeContext);

  console.log('render1');
  const { datas } = props;

  return (
    <View>
      {entireTableEnable === true && <EntireTable datas={datas} />}
      {recentTableEnable === true && <RecentTable datas={datas} />}
      {yearChartEnable === true && <Chart datas={datas} />}
      {monthChartEnable === true && <ChartMonth datas={datas} />}
      {dayChartEnable === true && <ChartDay datas={datas} />}
    </View>
  );
}

Stats.propTypes = {
  datas: PropTypes.shape({
    id: PropTypes.string,
    score: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
});
