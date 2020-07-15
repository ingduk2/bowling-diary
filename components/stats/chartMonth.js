/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import { Tooltip, Text as TooltipText } from 'react-native-elements';
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
    function makeMonthChartData() {}

    console.log('render1');
    // const nowDay = new Date();
    const data = [];
    const labels = [];
    const monthScoreArr = new Array(31);
    const monthCntArr = new Array(31);
    for (let i = 0; i < 31; i += 1) {
      monthScoreArr[i] = 0;
      monthCntArr[i] = 0;
    }

    const { currentYear, currentMonth } = this.state;
    console.log(currentMonth);

    const { datas } = this.props;

    // console.log(datas);
    // 월 안에 하루의 avg 로 보여주자.
    Object.values(datas)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
      .map((eachData) => {
        const dateObject = new Date(eachData.date);
        const month = dateObject.getMonth() + 1;
        // console.log(month);
        if (numberAppendZero(month) === currentMonth) {
          const day = Number(dateObject.getDate());
          monthScoreArr[day - 1] += Number(eachData.score);
          monthCntArr[day - 1] += 1;
        }

        return null;
      });

    for (let i = 0; i < 31; i += 1) {
      if (monthScoreArr[i] !== 0) {
        data.push(Math.round(monthScoreArr[i] / monthCntArr[i]));
        labels.push(i + 1);
      }
    }

    if (data.length === 0) {
      data.push(0);
      labels.push('no name');
    }

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16 }}>
                {currentYear}년 {currentMonth}월 차트
              </Text>
              <View style={{ paddingLeft: 10 }}>
                <Tooltip
                  width={330}
                  backgroundColor="#eaf8fd"
                  popover={<Text style={{}}>월 차트로서 하루 하루의 에버리지를 보여줍니다.</Text>}
                >
                  <AntDesign name="questioncircleo" size={24} color="black" />
                </Tooltip>
              </View>
            </View>
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
            xAxisLabel=""
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
              borderRadius: 8,
              margin: 3.9,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onDataPointClick={(value) => {
              const idx = value.index;
              // console.log(currentYear, currentMonth, labels[idx], value.value);
              const currentDate = labels[idx];
              const scoreStr =
                currentYear +
                '-' +
                currentMonth +
                '-' +
                numberAppendZero(currentDate.toString()) +
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
    fontSize: 30,
    color: '#B9DEFF',
    fontWeight: '600',
  },
});
