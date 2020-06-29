import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const months = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];

const weekDays = [
    "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// export default MyCalendar = () => {
//     const [foo, setFoo] = useState(30);
//     var rows = []

//     for (var i=1; i <= nDays[2]; i++){
//         rows.push(i);
//     }
//     console.log(rows);

//     useEffect(() => {
//         if (foo >= 42){
//             setFoo(42);
//         }
//     }, [foo])

//     return (
//         <View>
//             {
//                 rows.map(num => (
//                     <Text>{num}</Text>
//                 ))
//             }
//             <Text>Foo is {foo}.</Text>
//             <Button onPress={() => setFoo(foo + 1)} title='Increase Foo!'/>
//         </View>

//     )
// }

export default class MyCalendar extends React.Component{

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
          tableHead: ['일', '월', '화', '수', '목', '금', '토'],
          tableData: [
            [elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
            [elementButton('2'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
            [elementButton('3'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
            [elementButton('4'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
            [elementButton('5'), elementButton('1'), elementButton('1'), elementButton('1'), elementButton('1'),elementButton('1'), elementButton('1')],
          ]
        }
      }

      _alertIndex(value) {
        Alert.alert(`This is column ${value}`);
      }
     
      render() {
        const state = this.state;
        return (
          <View style={styles.container}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Button title="<"></Button>
                <Text >2020.09</Text>
                <Button title=">"></Button>
            </View>
            <Table borderStyle={{borderWidth: 0, borderColor: '#c8e1ff'}}>
              <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
              <Rows data={state.tableData} textStyle={styles.text}/>
            </Table>
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
            padding: 16, 
            paddingTop: 30, 
            backgroundColor: '#fff' ,
        },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 , height: 40}
      });