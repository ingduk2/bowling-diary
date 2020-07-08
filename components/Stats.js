/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['', 'low', 'high', 'avg'],

      fullTableTitle: [''],
      fullTableData: [['0', '0', '0']],

      tableTitle: ['3 게임', '6 게임', '9 게임', '-', '-'],
      tableData: [
        ['100', '200', '180'],
        ['100', '200', '180'],
        ['100', '200', '180'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }

  render() {
    console.log('render1');
    const nowDay = new Date();
    const year = nowDay.getFullYear().toString();

    const { tableHead, tableTitle, data, fullTableData, fullTableTitle, tableData } = this.state;
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

    const stats3 = {
      low: 301,
      high: 0,
      sum: 0,
      cnt: 0,
      avg: 0,
    };

    const stats6 = {
      low: 301,
      high: 0,
      sum: 0,
      cnt: 0,
      avg: 0,
    };

    const stats9 = {
      low: 301,
      high: 0,
      sum: 0,
      cnt: 0,
      avg: 0,
    };

    const sortedObject = Object.values(datas).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    let currentLow = 301;
    let currentHigh = 0;
    let currentSum = 0;
    let currentCnt = 0;

    for (let i = 0; i < 9; i += 1) {
      if (sortedObject.length === 0) break;
      console.log(sortedObject[i].date, sortedObject[i].score);
      currentLow = Math.min(currentLow, Number(sortedObject[i].score));
      currentHigh = Math.max(currentHigh, Number(sortedObject[i].score));
      currentCnt += 1;
      currentSum += Number(sortedObject[i].score);

      if (i === 2) {
        // console.log(sortedObject[i].date, sortedObject[i].score);
        // console.log(currentLow, currentHigh, currentCnt, currentSum);
        stats3.low = currentLow;
        stats3.high = currentHigh;
        stats3.avg = Math.round(currentSum / currentCnt);

        currentLow = 301;
        currentHigh = 0;
        currentCnt = 0;
        currentSum = 0;
      } else if (i === 5) {
        // console.log(sortedObject[i].date, sortedObject[i].score);
        // console.log(currentLow, currentHigh, currentCnt, currentSum);

        stats6.low = currentLow;
        stats6.high = currentHigh;
        stats6.avg = Math.round(currentSum / currentCnt);
        currentLow = 301;
        currentHigh = 0;
        currentCnt = 0;
        currentSum = 0;
      } else if (i === 8) {
        // console.log(sortedObject[i].date, sortedObject[i].score);
        // console.log(currentLow, currentHigh, currentCnt, currentSum);

        stats9.low = currentLow;
        stats9.high = currentHigh;
        stats9.avg = Math.round(currentSum / currentCnt);
        currentLow = 301;
        currentHigh = 0;
        currentCnt = 0;
        currentSum = 0;
      }
    }
    // console.log(stats3, stats6, stats9);

    tableData[0][0] = stats3.low;
    tableData[0][1] = stats3.high;
    tableData[0][2] = stats3.avg;

    tableData[1][0] = stats6.low;
    tableData[1][1] = stats6.high;
    tableData[1][2] = stats6.avg;

    tableData[2][0] = stats9.low;
    tableData[2][1] = stats9.high;
    tableData[2][2] = stats9.avg;

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

    // test
    // setState 안해도 되는건가 원래..?
    for (let i = 0; i < data.length; i += 1) {
      if (sumArr[i] !== 0) {
        data[i] = Math.round(sumArr[i] / countArr[i]);
      }
    }
    // test
    // console.log("======chart=======", data);
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

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.text}>최근 통계</Text>
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
              data={tableTitle}
              style={styles.title}
              heightArr={[28, 28]}
              textStyle={styles.text}
            />
            <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30 }}>
          <View style={styles.chartArrow}>
            <Text style={{ paddingLeft: 20, fontSize: 20 }}>&lt;</Text>

            <Text>{year} 월간 차트</Text>

            <Text style={{ paddingRight: 20, fontSize: 20 }}>&lt;</Text>
          </View>

          <LineChart
            data={{
              labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              datasets: [
                {
                  data,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            segments={8}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              // barPercentage: 10,
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(135, 206, 235, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 20,
              },
              propsForDots: {
                r: '2',
                strokeWidth: '2',
                stroke: '#617982',
              },
            }}
            bezier
            style={{
              marginVertical: 10,
              borderRadius: 8,
              margin: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 28 },
  text: { textAlign: 'center' },
  chartArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    justifyContent: 'space-between',
  },
});

Stats.propTypes = {
  datas: PropTypes.shape({
    id: PropTypes.string,
    score: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
};
