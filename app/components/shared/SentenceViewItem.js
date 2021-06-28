import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { normalize, fonts } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import { addToMySentence, removeFromMySentence } from './../../utils/MySentence'
import { showToast } from './../shared/global';
export default class SentenceViewItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFavorite: this.props.star
        }
    }
    async addToFavorite() {
        let _isFavorite = this.state.isFavorite;
        this.setState({isFavorite: !this.state.isFavorite});    

        if(!_isFavorite) {   
            if( await addToMySentence(this.props.param) ) {
                showToast("내 문장에 저장되었습니다.", "success");
            }
        }
        else {
            if( await removeFromMySentence(this.props.param) ) {
                showToast("내 문장에서 삭제되었습니다.", "success");
            }
        }
    }
    render() {
        return (
            <View style={{marginBottom: normalize(6)}}>
                <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                    <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                    zIndex: 10000}}
                    onPress={ () => { this.addToFavorite() } }>
                        <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                    </TouchableOpacity>

                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
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