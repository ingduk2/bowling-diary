import * as React from 'react';
import { StyleSheet, Text, View ,TextInput, Alert, Dimensions} from 'react-native';
import { FontAwesome5, Ionicons, Feather, AntDesign} from '@expo/vector-icons'; 
const { width, height } = Dimensions.get("window");

export default class ScoreInput extends React.Component{

    state = {
        score:""
    }


    render(){
console.log("ScoreInput render");
        
        const { score } = this.state;
        const { saveScore , addScoreData} = this.props;
        return (
            <View style={styles.container}>
                <FontAwesome5 name="bowling-ball" size={35} />
                {/* <MyCalendar/> */}
                <TextInput
                    // value={score == "-" ? null : score}
                    value ={score}
                    style={styles.input}
                    placeholder={"Score"}  
                    underlineColorAndroid={"transparent"}  
                    keyboardType='numeric'
                    maxLength={3}
                    returnKeyType={"done"}
                    onBlur={this._inputScore}
                    maxValue={300}
                    onChangeText={(score) => {
                        console.log(score);
                        if(Number(score) > 300){
                            console.log("300!!!!");
                            score = "300";
                        }
                        saveScore(score);
                        this.setState({
                            score:score
                        });
                    }}
                    
                />
                <AntDesign name="enter" size={35} color="black" 
                    onPress={() => {
                        this.setState({
                            score:""
                        });
                        
                        addScoreData() }}/>
            </View>
        );
    }

    _inputScore= () =>{
        const {score} = this.state;
        console.log("inputscore" , score);
    };

    
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
         justifyContent: 'center', alignItems: 'center'
    },
    input:{
        width : width / 4.5,
        borderColor: 'black',
        padding: 10,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25,
        textAlign : 'center'
    }
  });
