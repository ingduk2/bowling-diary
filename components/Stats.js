import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button, TouchableOpacity, Alert,Dimensions} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export default class Stats extends React.Component{
    constructor(props) {
        super(props);
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._alertIndex(value)}>
              <View >
                <Text style={styles.text}>{value}</Text>
              </View>
            </TouchableOpacity>
          );

       

        this.state = {


            tableHead: ['', 'low', 'high', 'avg'],

            fullTableTitle: [''],
            fullTableData:[
              ['0', '0', '0']
            ],

            tableTitle: ['3 게임', '6 게임', '9 게임', '-', '-', '-', '-'],
            tableData: [
              ['100', '200', '180'],
              ['100', '200', '180'],
              ['100', '200', '180'],
              ['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-'],
              ['-', '-', '-'],
            ],
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
      }

      _alertIndex(value) {
        Alert.alert(`This is column ${value}`);
      }
     
      render() {
        const state = this.state;
        const {data, fullTableData, fullTableTitle} = this.state;
        const {datas} = this.props;
        //월 별로 만들어야함.

        let sumArr = [0,0,0,0,0,0,0,0,0,0,0,0];
        let countArr = [0,0,0,0,0,0,0,0,0,0,0,0];


        let fullStats = {
          low : 301,
          high: 0,
          sum: 0,
          cnt: 0,
          ang: 0
        }
        // let low = 301;
        // let high = 0;
        // let sum = 0;
        // let cnt = 0;
        // let avg = 0;

        Object.values(datas).map(data => {
          console.log(data.date, data.score);
          let dateObject = new Date(data.date);
          let year = dateObject.getFullYear();
          let month = dateObject.getMonth();
          let dayOfWeek = dateObject.getDay();
          let dayOfMonth = dateObject.getDate();
          //
          countArr[Number(month)]++;
          sumArr[Number(month)] += Number(data.score);
          fullStats.low = Math.min(fullStats.low, Number(data.score));
          fullStats.high = Math.max(fullStats.high, Number(data.score));
          fullStats.sum += Number(data.score);
          fullStats.cnt += 1;
        })

        fullStats.avg = Math.round(fullStats.sum / fullStats.cnt);
        console.log(fullStats);
        let fullStatsArr = [];
        fullStatsArr.push(fullStats.low); // low
        fullStatsArr.push(fullStats.high); // high
        fullStatsArr.push(fullStats.avg); // avg
        
        for (let i = 0; i<3; i++){
          fullTableData[0][i] = fullStatsArr[i];
        }
        fullTableTitle[0] = fullStats.cnt + ' 게임';

        

        console.log(sumArr);
        console.log(countArr);
        
        //test
        //setState 안해도 되는건가 원래..?
        for(let i = 0; i<data.length; i++){
            if(sumArr[i] != 0){
              data[i] = sumArr[i]/countArr[i];
            }
        }
        //test
        // console.log("======chart=======", data);
        return (
          <View style={styles.container}>

<View style={{justifyContent: 'center', alignItems: 'center', paddingBottom:10}}>
                <Text style={styles.text}>전체 통계</Text>
            </View>
               <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.fullTableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.fullTableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
            

               <View style={{justifyContent: 'center', alignItems: 'center', paddingTop : 10, paddingBottom:10}}>
                <Text style={styles.text}>최근 통계</Text>
            </View>
               <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>

            <View style={{justifyContent: 'center', alignItems: 'center' , paddingTop:30}}>
  <Text>월간 차트</Text>
  <LineChart
    data={{
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
            data   
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=""
    segments={8}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
        // barPercentage: 10,
      backgroundColor: "#ffffff",
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(135, 206, 235, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 20
      },
      propsForDots: {
        r: "2",
        strokeWidth: "2",
        stroke: "#617982"
      }
    }}
    bezier
    style={{
      marginVertical: 10,
      borderRadius: 8,
      margin: 10,
      borderColor: 'black' ,
      borderWidth: 1
    }}
  />
</View>
          </View>
        )
      }

      _press = () => {
          console.log("press");
      }
    }
     
    const styles = StyleSheet.create({
        // container: { 
        //     flex: 1, 
        //     padding: 20, 
        //     paddingTop: 10, 
        //     backgroundColor: '#fff' ,
        // },
        // head: { height: 40, backgroundColor: '#f1f8ff' },
        // text: { margin: 6 , height: 40, textAlign:'center'},
        
        
        // wrapper: { flexDirection: 'row' },
        // title: { flex: 1, backgroundColor: '#f6f8fa' },
        // row: {  height: 28  },

        container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
        
      });