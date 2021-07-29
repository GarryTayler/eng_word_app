import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableHighlight} from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { fonts } from '../../assets/styles';
import {Actions} from 'react-native-router-flux';

export default class MyMakingWordDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    wordListView() { // 단어목록보기
        Actions.push('word_list_view', 
            { params: {   dictionary_id: this.props.id, 
                            before: 'mymakingword'}});
    }
    viewWordStudy() { //단어 학습
    }
    wordView() { //단어 보기
        Actions.push('word_view',
            { params: {   dictionary_id: this.props.id, 
                            before: 'mymakingword'}});
    }
    render()    {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.backImg} resizeMode='cover'>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: "wrap"}}>
                            <TouchableHighlight style={[styles.item, {marginRight: 11}]} activeOpacity={0.6}
                            onPress={ () => { this.wordView() } }>
                                <ImageBackground source={Images.wordView} resizeMode='cover' style={{flex: 1}}
                                    imageStyle={styles.itemImg}>
                                    <View style={{flex: 1, position: 'relative'}}>
                                        <View style={styles.labelContainer}>
                                            <Text style={[fonts.size13, fonts.familyBold, fonts.colorWhite]}>단어보기</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableHighlight>

                            <TouchableHighlight style={[styles.item, {marginRight: 11}]} 
                            onPress={ () => { this.wordListView() } } activeOpacity={0.6}>
                                <ImageBackground source={Images.wordListView} resizeMode='cover' style={{flex: 1}}
                                    imageStyle={styles.itemImg}>
                                    <View style={{flex: 1, position: 'relative'}}>
                                        <View style={styles.labelContainer}>
                                            <Text style={[fonts.size13, fonts.familyBold, fonts.colorWhite]}>단어목록보기</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.item} onPress={ () => { this.buttonClick() } } 
                            onPress={ () => { this.viewWordStudy() } } activeOpacity={0.6}>
                                <ImageBackground source={Images.wordStudy} resizeMode='cover' style={{flex: 1}}
                                    imageStyle={styles.itemImg}>
                                    <View style={{flex: 1, position: 'relative'}}>
                                        <View style={styles.labelContainer}>
                                            <Text style={[fonts.size13, fonts.familyBold, fonts.colorWhite]}>단어학습</Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </TouchableHighlight>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );       
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    backImg: {
        flex: 1,
        justifyContent: 'center'
    },
    itemImg: {
        borderRadius: 8
    },
    item: {
        height: 152,
        width: 102,
        borderRadius: 8
    },
    labelContainer: {
        backgroundColor: 'rgba(0,0,0, 0.6)',
        position: 'absolute',
        width: '100%',
        height: 43,
        bottom: 0,
        alignItems: 'center', justifyContent:'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    }
});