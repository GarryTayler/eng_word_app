import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableHighlight} from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { fonts } from '../../assets/styles';
export default class MyWordHome extends React.Component {
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