import * as React from 'react';
import { StyleSheet, Text, View ,TextInput, Alert} from 'react-native';

export default class Home extends React.Component{

    state = {
        score:"-"
    }


    render(){
console.log("Home render");

        const { score } = this.state;
        const { saveScore } = this.props;
        return (
            
            <View style={styles.container}>
                {/* <MyCalendar/> */}
                <TextInput
                    value={score == "-" ? null : score}
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
         justifyContent: 'center', alignItems: 'center'
    },
    input:{
        borderColor: 'black',
        padding: 10,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25
    }
  });
