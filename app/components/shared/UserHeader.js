import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Header , View , Text} from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { normalize } from './../../assets/styles';
export default class UserHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    backButtonPressed() {
        Actions.pop();
    }

    render() {
        return (
            <Header style={[styles.header , {display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent: 'center', height: 50}]} androidStatusBarColor='green' iosBarStyle="light-content" >
                <View style={{ position: 'absolute', left: 7}}>
                    <TouchableOpacity onPress={() => this.backButtonPressed()}>
                        <Icon name='chevron-left' type='evilicon' size={42} color='white' /> 
                    </TouchableOpacity>
                </View>
                <View style={{textAlign: 'center'}}>
                   <Text style={styles.userHeaderText}>{this.props.title}</Text>
               </View> 
            </Header>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0,
        elevation: 0,
        padding: 0,
        zIndex:10000,
        position: 'relative',
    },
    userHeaderText: {
        color: 'white',
        fontSize: normalize(18),
        lineHeight: normalize(18),
        fontWeight: 'bold',
        paddingTop: normalize(3)
    }
});
