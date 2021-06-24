import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import Images from './../../assets/Images';

export default class ResultDetailItem extends React.Component {
    constructor(props){
        super(props);       
    }
    renderCorrectAnswer() {
        if(!this.props.correct) {
            return (
                <View style={{marginTop: normalize(4)}}>
                    <Text numberOfLines={1} style={[fonts.size14, fonts.colorRed]}>
                        정답 : { this.props.correctAnswer }
                    </Text>
                </View>
            );
        }
        else {
            return null;
        }
    }
    render() {
        return (
            <View style={styles.resultDetailItem}>           
                <View style={{paddingRight: normalize(6)}}>
                    <Icon name='star' type='antdesign' size={22} color='rgba(0,0,0,0.2)' />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                                    flexShrink: 1}}>
                    <View style={{flex: 22}}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[fonts.size14, fonts.weightBold]}>
                                {this.props.currentNo}.
                            </Text>
                            <Text numberOfLines={1} style={[fonts.size20, fonts.weightBold, {marginLeft: normalize(6)}]}>
                                {this.props.word}
                            </Text>
                        </View>
                        <View style={{marginTop: normalize(4)}}>
                            <Text numberOfLines={1} style={[fonts.size14, {textDecorationLine: (this.props.correct ? 'none' : 'line-through')}]}>
                                {this.props.meaning}
                            </Text>
                        </View>
                        { this.renderCorrectAnswer() }
                    </View>
                    <View style={{flex: 2, alignItems: 'flex-end'}}>
                        <Image source={this.props.correct ? Images.correct16 : Images.wrong16} style={styles.resultIcon} resizeMode='cover' />
                    </View>                                        
                </View>       
            </View>
        )
    }   
}

const styles = StyleSheet.create({
    resultDetailItem: {
        borderBottomWidth: 1, 
        borderColor: 'rgba(0, 0, 0, 0.5)',
        paddingLeft: normalize(12),
        paddingRight: normalize(20),
        paddingTop: normalize(8), 
        paddingBottom: normalize(8),
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'flex-start'
    },
    resultIcon: {
        width: 16,
        height: 16
    }
});