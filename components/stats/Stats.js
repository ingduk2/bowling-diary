/* eslint-disable no-use-before-define */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Chart from './chart';
import EntireTable from './entireTable';
import RecentTable from './recentTable';
import PlaceTable from './placeTable';
import ChartDay from './chartDay';
import ChartMonth from './chartMonth';
import StatsThemeContext from '../../context/StatsThemeContext';

export default function Stats(props) {
  const { array } = useContext(StatsThemeContext);

  console.log('Stats', array);
  const { datas } = props;

  return (
    <View>
      {array[5].enable === true && <PlaceTable datas={datas} />}
      {array[0].enable === true && <EntireTable datas={datas} />}
      {array[1].enable === true && <RecentTable datas={datas} />}
      {array[2].enable === true && <Chart datas={datas} />}
      {array[3].enable === true && <ChartMonth datas={datas} />}
      {array[4].enable === true && <ChartDay datas={datas} />}
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
