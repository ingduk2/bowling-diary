/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Chart from './chart';
import EntireTable from './entireTable';
import RecentTable from './recentTable';
import ChartDay from './chartDay';
import ChartMonth from './chartMonth';

export default function Stats(props) {
  console.log('render1');
  const { datas } = props;

  console.log(datas);

  return (
    <View>
      <EntireTable datas={datas} />
      <RecentTable datas={datas} />
      <Chart datas={datas} />
      <ChartMonth datas={datas} />
      <ChartDay datas={datas} />
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
