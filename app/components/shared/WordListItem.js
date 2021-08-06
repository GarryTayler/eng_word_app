import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import { addToMyWord, removeFromMyWord } from './../../utils/MyWord';
import WordSpeech from './../../components/shared/WordSpeech';
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
                showToast("add_to_myword", "success");
            }
        }
        else {
            if( await removeFromMyWord(this.props.param) ) {
                showToast("remove_from_myword", "success");
            }
        }
    }
    render() {
        return (
            <View style={styles.wordListItem}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity activeOpacity={0.6} style={{alignItems: 'flex-start'}}
                    onPress={ () => { this.addToFavorite() } }>
                        <Icon name='star' size={20} type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                    </TouchableOpacity>
                    <Text style={[fonts.size12, fonts.familyBold, {paddingLeft: 15}]}>{this.props.currentNo} / {this.props.totalCount}</Text>
                </View>
                <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                        alignItems: 'flex-start'}}>
                    
                    {
                        this.props.wordShow ? 
                            <TouchableOpacity activeOpacity={0.6} style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4) }}
                        onPress={ () => { this.setState({marqueeWordDisable: !this.state.marqueeWordDisable}) }}>
                                <Text style={[fonts.size16, fonts.familyBold]}>{this.props.word}</Text>
                            </TouchableOpacity>
                        :
                        <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4) }}>
                        </View>
                    }
                    {
                        this.props.meaningShow ? 
                        <TouchableOpacity activeOpacity={0.6} style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}
                    onPress={ () => { this.setState({marqueeMeaningDisable: !this.state.marqueeMeaningDisable}) }}>
                            <Text style={[fonts.size12, fonts.familyBold, {lineHeight: 15}]}>{this.props.meaning}</Text>
                        </TouchableOpacity>
                        :
                        <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}></View>
                    }
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <WordSpeech word={this.props.word} />
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