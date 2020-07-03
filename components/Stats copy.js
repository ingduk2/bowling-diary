import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button, TouchableOpacity, Alert,Dimensions} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
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
          tableHead: ['low', 'high', 'Average'],
          tableData: [
            [99, 300, 250],
            // [elementButton('2'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
          ]
          ,
          data: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
      }

      _alertIndex(value) {
        Alert.alert(`This is column ${value}`);
      }
     
      render() {
        const state = this.state;
        const {data} = this.state;
        //test
        for(let i = 0; i<data.length; i++){
            data[i] = 30* i;
        }
        //test
        console.log("======chart=======", data);
        return (
          <View style={styles.container}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>전체 통계</Text>
            </View>
            <View >
            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}} style={{}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={state.tableData} textStyle={styles.text}/>
            </Table>
            </View>
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
        container: { 
            flex: 1, 
            padding: 20, 
            paddingTop: 10, 
            backgroundColor: '#fff' ,
        },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 , height: 40, textAlign:'center'},
      });