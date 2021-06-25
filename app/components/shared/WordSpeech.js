import React from 'react';
import { StyleSheet, View } from 'react-native';
import { normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
export default class WordSpeech extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={[styles.wordPronunciationSound, { backgroundColor: this.props.wordView?'white':'#F4F4F4' }]}>
                <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
            </View>           
        );
    }
}

const styles = StyleSheet.create({
    wordPronunciationSound: {
        width: normalize(32),
        height: normalize(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32          
    }
});