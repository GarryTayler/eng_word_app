import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableHighlight, ScrollView} from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { fonts } from '../../assets/styles';
import { Icon } from 'react-native-elements';

export default class Detail extends React.Component {
    constructor(props){
        super(props);
    }
    buttonClick() {
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.backImg} resizeMode='cover'>
                        <ScrollView>
                            <View style={{paddingVertical: 34}}>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: "wrap"}}>
                                    <TouchableHighlight style={[styles.item, {marginRight: 11}]} onPress={ () => { this.buttonClick() } } activeOpacity={0.6}>
                                        <ImageBackground source={Images.wordView} resizeMode='cover' style={{flex: 1}}
                                            imageStyle={styles.itemImg}>
                                            <View style={{flex: 1, position: 'relative'}}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>단어보기</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>

                                    <TouchableHighlight style={[styles.item, {marginRight: 11}]} onPress={ () => { this.buttonClick() } } activeOpacity={0.6}>
                                        <ImageBackground source={Images.wordListView} resizeMode='cover' style={{flex: 1}}
                                            imageStyle={styles.itemImg}>
                                            <View style={{flex: 1, position: 'relative'}}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>단어목록보기</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>

                                    <TouchableHighlight style={styles.item} onPress={ () => { this.buttonClick() } } activeOpacity={0.6}>
                                        <ImageBackground source={Images.wordStudy} resizeMode='cover' style={{flex: 1}}
                                            imageStyle={styles.itemImg}>
                                            <View style={{flex: 1, position: 'relative'}}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>단어학습</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: "wrap", marginTop: 23}}>
                                    <TouchableHighlight style={[styles.item, {marginRight: 16}]} onPress={ () => { this.buttonClick() } } activeOpacity={0.6}>
                                        <ImageBackground source={Images.sen_view} resizeMode='cover' style={{flex: 1}}
                                            imageStyle={styles.itemImg}>
                                            <View style={{flex: 1, position: 'relative'}}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>문장보기</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>

                                    <TouchableHighlight style={[styles.item]} onPress={ () => { this.buttonClick() } } activeOpacity={0.6}>
                                        <ImageBackground source={Images.sen_study} resizeMode='cover' style={{flex: 1}}
                                            imageStyle={styles.itemImg}>
                                            <View style={{flex: 1, position: 'relative'}}>
                                                <View style={styles.labelContainer}>
                                                    <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>문장학습</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>    
                                </View>
                                <View style={{marginHorizontal: 24, 
                                            height: 48, 
                                            backgroundColor: 'white', 
                                            borderRadius: 4, marginTop: 29,
                                            flexDirection: 'row', alignItems: 'center', display: 'flex', paddingRight: 12}}>
                                        <View style={{flex: 2}}>
                                            <Icon color='#EB5757' name='sc-youtube' type='evilicon' size={36} iconStyle={{margin: 0}} />
                                        </View>
                                        <View style={{flex: 9, paddingRight: 9}}>
                                            <Text numberOfLines={1} style={[fonts.size16, fonts.weightBold]}>문법 - 동영상</Text>
                                        </View>
                                        <View style={[styles.editItem]}>        
                                            <Icon color='black' name='pencil' type='evilicon' size={26} />
                                        </View>
                                </View>
                                <View style={{marginHorizontal: 24, 
                                            height: 48, 
                                            backgroundColor: 'white', 
                                            borderRadius: 4, marginTop: 10,
                                            flexDirection: 'row', alignItems: 'center', display: 'flex', paddingRight: 12}}>
                                        <View style={{flex: 2}}>
                                            <Icon color='#EB5757' name='sc-youtube' type='evilicon' size={36} iconStyle={{margin: 0}} />
                                        </View>
                                        <View style={{flex: 9, paddingRight: 9}}>
                                            <Text numberOfLines={1} style={[fonts.size16, fonts.weightBold]}>문법 - 부정사의 의미상 주어</Text>
                                        </View>
                                        <View style={[styles.editItem]}>        
                                            <Icon color='black' name='pencil' type='evilicon' size={26} />
                                        </View>
                                </View>
                                <View style={{marginHorizontal: 24, 
                                            height: 48, 
                                            backgroundColor: 'white', 
                                            borderRadius: 4, marginTop: 10,
                                            flexDirection: 'row', alignItems: 'center', display: 'flex', paddingRight: 12}}>
                                        <View style={{flex: 2}}>
                                            <Icon color='#EB5757' name='sc-youtube' type='evilicon' size={36} iconStyle={{margin: 0}} />
                                        </View>
                                        <View style={{flex: 9, paddingRight: 9}}>
                                            <Text numberOfLines={1} style={[fonts.size16, fonts.weightBold]}>본문 강의</Text>
                                        </View>
                                        <View style={[styles.editItem]}>        
                                            <Icon color='black' name='pencil' type='evilicon' size={26} />
                                        </View>
                                </View>
                            </View>
                        </ScrollView>
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
        flex: 1
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
    },
    editItem: {
        backgroundColor: 'white',
        shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
        borderRadius: 4,

        width: 24,
        height: 24,
        alignItems: 'center', justifyContent: 'center'
    }
});