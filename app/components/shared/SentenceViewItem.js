import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
export default class SentenceViewItem extends React.Component {
    constructor(props){
        super(props);
    }
    render()        {
        return (
            <View style={{marginBottom: normalize(6)}}>
                <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                    <View style={{position: 'absolute', paddingTop: normalize(3)}}>
                        <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                    </View>
                    <Text style={styles.sentenceSection}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.currentNo}. {this.props.english}
                    </Text> 
                </View>
                <View>
                    <Text style={[styles.sentenceSection]}>
                        {this.props.korean}
                    </Text>
                </View>
            </View>    
        );    
    }
}

const styles = StyleSheet.create({
    sentenceSection: {
        fontSize: normalize(15),
        lineHeight: normalize(30)
    }    
});