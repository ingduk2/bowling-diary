/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class EntireTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['', 'low', 'high', 'avg'],

      fullTableTitle: [''],
      fullTableData: [['0', '0', '0']],
    };
  }

  render() {
    console.log('render1');
    // const nowDay = new Date();
    // const year = nowDay.getFullYear().toString();

    const { tableHead, fullTableData, fullTableTitle } = this.state;
    const { datas } = this.props;

    console.log(datas);
    // 월 별로 만들어야함.

    const sumArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const countArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const fullStats = {
      low: 301,
      high: 0,
      sum: 0,
      cnt: 0,
      avg: 0,
    };

    Object.values(datas).map((eachData) => {
      const dateObject = new Date(eachData.date);
      const month = dateObject.getMonth();
      //
      countArr[Number(month)] += 1;
      sumArr[Number(month)] += Number(eachData.score);
      fullStats.low = Math.min(fullStats.low, Number(eachData.score));
      fullStats.high = Math.max(fullStats.high, Number(eachData.score));
      fullStats.sum += Number(eachData.score);
      fullStats.cnt += 1;
      return null;
    });

    fullStats.avg = Math.round(fullStats.sum / fullStats.cnt);
    // console.log(fullStats);
    const fullStatsArr = [];
    fullStatsArr.push(fullStats.low); // low
    fullStatsArr.push(fullStats.high); // high
    fullStatsArr.push(fullStats.avg); // avg

    for (let i = 0; i < 3; i += 1) {
      fullTableData[0][i] = fullStatsArr[i];
    }
    fullTableTitle[0] = `${fullStats.cnt} 게임`;

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
          <Text style={styles.text}>전체 통계</Text>
        </View>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={[1, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={fullTableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows
              data={fullTableData}
              flexArr={[1, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

EntireTable.propTypes = {
  datas: PropTypes.shape({
    id: PropTypes.string,
    score: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  chartArrowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    justifyContent: 'space-between',
  },
  chartArrow: {
    padding: 10,
    fontSize: 20,
    color: '#B9DEFF',
    fontWeight: '700',
  },
});
