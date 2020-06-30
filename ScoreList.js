import * as React from 'react';
import { StyleSheet, Text, View ,Dimensions,TextInput} from 'react-native';

const { width, height } = Dimensions.get("window");

export default function ScoreList(props){

    let ms = props.createdAt
    let dateString = props.date;
    console.log(new Date(dateString).getTime(), new Date(ms).toLocaleString());
    // const time = new Date(ms).toLocaleString();
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.text}>{props.date} ( {props.score} 점) </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      width: width - 50,
      borderBottomColor: "#bbb",
      borderBottomWidth: StyleSheet.hairlineWidth,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 3,
      marginRight: 20
    },
    completedCircle: {
      borderColor: "#bbb"
    },
    uncompletedCircle: {
      borderColor: "#F23657"
    },
    text: {
      fontWeight: "600",
      fontSize: 20,
      marginVertical: 20
    },
    completedText: {
      color: "#bbb",
      textDecorationLine: "line-through"
    },
    uncompletedText: {
      color: "#353839"
    },
    column: {
      flexDirection: "row",
      alignItems: "center",
    //   width: width / 2
    },
    actions: {
      flexDirection: "row"
    },
    actionContainer: {
      marginVertical: 10,
      marginHorizontal: 10
    },
    input: {
      width: width / 2,
      marginVertical: 15,
      paddingBottom: 5
    }
  });