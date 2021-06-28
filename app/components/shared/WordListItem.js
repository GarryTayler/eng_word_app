import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import { addToMyWord, removeFromMyWord } from './../../utils/MyWord';
import WordSpeech from './../../components/shared/WordSpeech';
import TextTicker from 'react-native-text-ticker'
import { showToast } from './../shared/global';

export default class WordListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            marqueeWordDisable: true,
            marqueeMeaningDisable: true,
            isFavorite: this.props.star
        }
    }
    async addToFavorite() {
        let _isFavorite = this.state.isFavorite;
        this.setState({isFavorite: !this.state.isFavorite});
        if(!_isFavorite) {
            
            if( await addToMyWord(this.props.param) ) {
                showToast("내 단어장에 저장되었습니다.", "success");
            }
        }
        else {
            if( await removeFromMyWord(this.props.param) ) {
                showToast("내 단어장에서 삭제되었습니다.", "success");
            }
        }
    }
    render() {
        return (
            <View style={styles.wordListItem}>
                <View><Text style={[fonts.size12, fonts.weightBold]}>{this.props.currentNo} / {this.props.totalCount}</Text></View>
                <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                        alignItems: 'center'}}>
                    <TouchableOpacity activeOpacity={0.6} style={{flex: 1, alignItems: 'flex-start'}}
                    onPress={ () => { this.addToFavorite() } }>
                        <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                    </TouchableOpacity>
                    {
                        this.props.wordShow ? 
                            <TouchableOpacity activeOpacity={0.6} style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4) }}
                        onPress={ () => { this.setState({marqueeWordDisable: !this.state.marqueeWordDisable}) }}>
                                <TextTicker disabled={this.state.marqueeWordDisable}
                                isInteraction={false} duration={3000} loop
                                repeatSpacer={50} marqueeDelay={1000} style={[fonts.size18, fonts.weightBold]}>{this.props.word}</TextTicker>
                            </TouchableOpacity>
                        :
                        <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4) }}>
                        </View>
                    }
                    {
                        this.props.meaningShow ? 
                        <TouchableOpacity activeOpacity={0.6} style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}
                    onPress={ () => { this.setState({marqueeMeaningDisable: !this.state.marqueeMeaningDisable}) }}>
                            <TextTicker disabled={this.state.marqueeMeaningDisable}
                            isInteraction={false} duration={3000} loop
                            repeatSpacer={50} marqueeDelay={1000} style={[fonts.size18, fonts.weightBold]}>{this.props.meaning}</TextTicker>
                        </TouchableOpacity>
                        :
                        <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}></View>
                    }
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