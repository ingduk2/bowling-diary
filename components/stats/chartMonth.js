/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { getYearYYYY, getMonthMM, numberAppendZero } from '../../constants/const';

const { width } = Dimensions.get('window');

export default class ChartMonth extends React.Component {
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
    console.log('render1');
    // const nowDay = new Date();
    const data = [0];
    const labels = [0];

    const { currentYear, currentMonth } = this.state;
    console.log(currentMonth);

    const { datas } = this.props;

    // console.log(datas);
    // 월 별로 만들어야함.

    Object.values(datas)
      .sort((a, b) => {
        return a.createdAt - b.createdAt;
      })
      .map((eachData) => {
        const dateObject = new Date(eachData.date);
        const month = dateObject.getMonth() + 1;
        // console.log(month);
        if (numberAppendZero(month) === currentMonth) {
          console.log(eachData);
          data.push(eachData.score);
          labels.push(dateObject.getDate());
        }

        return null;
      });

    console.log(data);
    console.log(labels);

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
          <View style={styles.chartArrowWrapper}>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-${currentMonth}-01`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setMonth(dateObject.getMonth() - 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                const beforeMonth = numberAppendZero(Number(dateObject.getMonth() + 1));
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                  currentMonth: beforeMonth,
                });
              }}
            >
              <Text style={styles.chartArrow}>&lt;</Text>
            </TouchableOpacity>
            <Text>
              {currentYear}년 {currentMonth}월 차트
            </Text>
            <TouchableOpacity
              onPress={() => {
                // 왜 2020-7-08 되면 이상해지고 2020-07-08 되야 멀쩡하니 ㅡㅡ;;
                const dateString = `${currentYear}-${currentMonth}-01`;
                // console.log(dateString);
                const dateObject = new Date(dateString);
                // console.log(dateObject);
                dateObject.setMonth(dateObject.getMonth() + 1);
                // console.log(dateObject.getFullYear());
                // console.log(dateObject.getMonth() + 1);
                // console.log(dateObject.getDate());
                const afterMonth = numberAppendZero(Number(dateObject.getMonth() + 1));
                // console.log(beforeDay);
                this.setState({
                  currentYear: dateObject.getFullYear(),
                  currentMonth: afterMonth,
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

ChartMonth.propTypes = {
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
    fontSize: 20,
    color: '#B9DEFF',
    fontWeight: '700',
  },
});
