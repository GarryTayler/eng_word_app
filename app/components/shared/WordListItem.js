import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import WordSpeech from './../../components/shared/WordSpeech';
import TextTicker from 'react-native-text-ticker'

export default class WordListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            marqueeDisable: false
        }
    }
    render() {
        return (
            <View style={styles.wordListItem}>
                <View><Text style={[fonts.size12, fonts.weightBold]}>{this.props.currentNo} / {this.props.totalCount}</Text></View>
                <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                        alignItems: 'center'}}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                    </View>
                    <TouchableOpacity activeOpacity={0.6} style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4) }}
                    onPress={ () => { this.setState({marqueeDisable: !this.state.marqueeDisable}) }}>
                        <TextTicker disabled={this.state.marqueeDisable}
                        isInteraction={false} duration={3000} loop
                        repeatSpacer={50} marqueeDelay={1000} style={[fonts.size18, fonts.weightBold]}>{this.props.word}</TextTicker>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}
                    onPress={ () => { this.setState({marqueeDisable: !this.state.marqueeDisable}) }}>
                        <TextTicker disabled={this.state.marqueeDisable}
                        isInteraction={false} duration={3000} loop
                        repeatSpacer={50} marqueeDelay={1000} style={[fonts.size18, fonts.weightBold]}>{this.props.meaning}</TextTicker>
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <WordSpeech />
                    </View>
                </View>                           
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wordListItem: {
        paddingLeft: normalize(18),
        paddingRight: normalize(12),
        paddingTop: normalize(12),
        paddingBottom: normalize(6),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)'                      
    }
});