/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { getYearYYYY, getMonthMM, numberAppendZero } from '../../constants/const';

const { width } = Dimensions.get('window');

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = getYearYYYY();
    const currentMonth = getMonthMM();
    this.state = {
      currentYear,
      currentMonth,
    };
  }

  render() {
    console.log('render chart Year');
    // const nowDay = new Date();

    const { currentYear, currentMonth } = this.state;
    console.log(currentMonth);

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const { datas } = this.props;

    // console.log(datas);
    // 월 별로 만들어야함.

    const sumArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const countArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const fullStats = {
      low: 301,
      high: 0,
      sum: 0,
      cnt: 0,
      avg: 0,
    };

    Object.values(datas).map((eachData) => {
      const dateObject = new Date(eachData.date);
      if (dateObject.getFullYear() === currentYear) {
        const month = dateObject.getMonth();
        //
        countArr[Number(month)] += 1;
        sumArr[Number(month)] += Number(eachData.score);
        fullStats.low = Math.min(fullStats.low, Number(eachData.score));
        fullStats.high = Math.max(fullStats.high, Number(eachData.score));
        fullStats.sum += Number(eachData.score);
        fullStats.cnt += 1;
      }
      return null;
    });

    fullStats.avg = Math.round(fullStats.sum / fullStats.cnt);
    // console.log(fullStats);
    const fullStatsArr = [];
    fullStatsArr.push(fullStats.low); // low
    fullStatsArr.push(fullStats.high); // high
    fullStatsArr.push(fullStats.avg); // avg

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
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <View style={styles.chartArrowWrapper}>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-01-01`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setFullYear(dateObject.getFullYear() - 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                });
              }}
            >
              <Text style={styles.chartArrow}>&lt;</Text>
            </TouchableOpacity>
            <Text>{currentYear}년 차트</Text>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-01-01`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setFullYear(dateObject.getFullYear() + 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                });
              }}
            >
              <Text style={styles.chartArrow}>&gt;</Text>
            </TouchableOpacity>
          </View>

          <LineChart
            fromZero
            data={{
              labels,
              datasets: [
                {
                  data,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=" 점"
            segments={4}
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
                r: '3',
                strokeWidth: '2',
                stroke: '#617982',
              },
            }}
            // bezier
            style={{
              marginVertical: 1,
              alignItems: 'center',
              borderRadius: 8,
              margin: 3.9,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onDataPointClick={(value) => {
              const idx = value.index;
              // console.log(currentYear, currentMonth, labels[idx], value.value);
              const currentMonth = labels[idx];
              const scoreStr =
                currentYear +
                '-' +
                numberAppendZero(currentMonth) +
                ' 에버리지' +
                value.value +
                '점';
              Alert.alert(scoreStr);
            }}
          />
        </View>
      </View>
    );
  }
}

Chart.propTypes = {
  datas: PropTypes.shape({
    id: PropTypes.string,
    score: PropTypes.string,
    date: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
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
    fontSize: 30,
    color: '#B9DEFF',
    fontWeight: '600',
  },
});
