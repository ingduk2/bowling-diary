/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class placeTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['', 'low', 'high', 'avg'],

      //   tableTitle: ['11', '22', '33'],
      //   tableData: [
      //     ['100', '200', '180'],
      //     ['100', '200', '180'],
      //     ['100', '200', '180'],
      //     // ['-', '-', '],
      //     // ['-', '-', '-'],
      //   ],
    };
  }

  render() {
    console.log('placeTable');
    const tableTitle = [];
    const tableData = [];

    const { tableHead } = this.state;
    const { datas } = this.props;

    const sortedObject = Object.values(datas).sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA === dateB) {
        return b.createdAt - a.createdAt;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const dataMap = new Map();
    sortedObject.forEach((data) => {
      if (data.placeId !== '0') {
        // has key
        if (dataMap.has(data.place)) {
          const array = dataMap.get(data.place);
          array.push(data.score);
          dataMap.set(data.place, array);
        }
        // no key
        else {
          const array = [];
          array.push(data.score);
          dataMap.set(data.place, array);
        }
      }
    });
    console.log(dataMap);

    dataMap.forEach((value, key) => {
      let min = 301;
      let max = 0;
      let sum = 0;
      let cnt = 0;

      console.log(key, value);
      tableTitle.push(key);
      //min , max , avg 구해서 각각 배열로 한 후에 push
      value.forEach((element) => {
        min = Math.min(min, element);
        max = Math.max(max, element);
        sum += Number(element);
        cnt += 1;
      });
      tableData.push([min, max, Math.round(sum / cnt)]);
    });

    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={styles.text}>장소별 통계</Text>
        </View>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={tableHead}
            flexArr={[2.52, 1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={tableTitle}
              style={styles.title}
              heightArr={[40, 40]}
              textStyle={styles.text}
            />
            <Rows
              data={tableData}
              flexArr={[0.4, 0.4, 0.4]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

placeTable.propTypes = {
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
  row: { height: 40 },
  text: { textAlign: 'center', fontSize: 14 },
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
