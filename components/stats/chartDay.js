/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { getYearYYYY, getMonthMM, numberAppendZero, getDayDD } from '../../constants/const';

const { width } = Dimensions.get('window');

export default class ChartDay extends React.Component {
  constructor(props) {
    super(props);

    const currentYear = getYearYYYY();
    const currentMonth = getMonthMM();
    const currentDay = getDayDD();
    this.state = {
      currentYear,
      currentMonth,
      currentDay,
      // data: [0],
      // labels: [0],
    };
  }

  render() {
    console.log('render1');
    // const nowDay = new Date();

    const { currentYear, currentMonth, currentDay } = this.state;
    console.log(currentMonth);

    const data = [0];
    const labels = [0];
    const { datas } = this.props;

    let count = 1;
    Object.values(datas)
      .sort((a, b) => {
        // 이거 왜 반대지???
        return a.createdAt - b.createdAt;
      })
      .map((eachData) => {
        // const day = numberAppendZero(dateObject.getDate());

        if (eachData.date === `${currentYear}-${currentMonth}-${currentDay}`) {
          // console.log(eachData);
          data.push(eachData.score);
          labels.push(count);
          count += 1;
        }
        return null;
      });
    // console.log(data, data.length);
    // console.log(labels);

    // setState 안해도 되는건가 원래..?
    // for (let i = 0; i < data.length; i += 1) {
    //   if (sumArr[i] !== 0) {
    //     data[i] = Math.round(sumArr[i] / countArr[i]);
    //   }
    // }
    // test
    // console.log("======chart=======", data);
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <View style={styles.chartArrowWrapper}>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-${currentMonth}-${currentDay}`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setDate(dateObject.getDate() - 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                const beforeDay = numberAppendZero(Number(dateObject.getDate()));
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                  currentMonth: numberAppendZero(dateObject.getMonth() + 1),
                  currentDay: beforeDay,
                });
              }}
            >
              <Text style={styles.chartArrow}>&lt;</Text>
            </TouchableOpacity>
            <Text>
              {currentYear}년 {currentMonth}월 {currentDay}일 차트
            </Text>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-${currentMonth}-${currentDay}`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setDate(dateObject.getDate() + 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                const afterDay = numberAppendZero(Number(dateObject.getDate()));
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                  currentMonth: numberAppendZero(dateObject.getMonth() + 1),
                  currentDay: afterDay,
                });
              }}
            >
              <Text style={styles.chartArrow}>&gt;</Text>
            </TouchableOpacity>
          </View>

          <LineChart
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
            yAxisSuffix=""
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

ChartDay.propTypes = {
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
    fontWeight: '700',
  },
});
