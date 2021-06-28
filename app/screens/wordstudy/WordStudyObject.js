import React from 'react';
import { Container, Content, Button } from 'native-base';
import { StyleSheet, View, Text, Image } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import UserHeader from './../../components/shared/UserHeader';
import ChoiceItem from './../../components/wordstudy/ChoiceItem';
import WordStudyHeader from './../../components/wordstudy/WordStudyHeader';
import Images from './../../assets/Images';

let pageTitle = '단어 학습';

export default class WordStudyObject extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <WordStudyHeader title="중1비상 (홍민표) 31과"
                                 totalProblems="20" currentNo="12" rightAnswer="5" wrongAnswer="5" />
                <Content style={styles.container}>
                    <View style={styles.problemContainer}>
                        <View style={{position: 'absolute', top: normalize(28)}}>
                            <Text style={[fonts.size14, fonts.familyBold]}>
                                다음 단어의 뜻을 보기에서 선택하세요.
                            </Text>
                        </View>
                        <Image source={Images.correct2x} style={styles.correctIcon} resizeMode='cover' />
                        <Text style={[fonts.size38, fonts.familyBold]}>
                            chicken
                        </Text>
                        <View style={{position: 'absolute', bottom: normalize(40), display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{backgroundColor: '#92BEF8', borderRadius: normalize(4), padding: normalize(4)}}>
                                <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>정답</Text>
                            </View>
                            <View style={{marginLeft: normalize(8)}}>
                                <Text numberOfLines={1} style={[fonts.familyBold, fonts.size18, {color: '#92BEF8'}]}>닭, 닭고기</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: normalize(20)}}>
                        <ChoiceItem index="1" choice="닭, 닭고기" correct />
                        <ChoiceItem index="2" choice="돌, 돌맹이, 바위" />
                        <ChoiceItem index="3" choice="부엌, 주방" />
                        <ChoiceItem index="4" choice="행복한, 기쁜, 즐거움에 겨운" />
                        <ChoiceItem index="5" choice="별, 항성, 유명인" wrong />
                    </View>
                    <View style={[styles.footerConfirm, styles.footerConfirm]}>
                        <Button style={styles.confirmButton}>
                            <Text style={[fonts.familyBold, fonts.size18, fonts.colorWhite]}>확인</Text>
                        </Button> 
                    </View>
                </Content>
            </Container>           
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    problemContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: normalize(262), 
        position: 'relative'       
    },
    correctIcon: {
        opacity: 0.5, 
        width: normalize(102), 
        height: normalize(102),
        position: 'absolute',
    },
    footerConfirm: {
        height: normalize(126),
        paddingTop: normalize(18),
        alignSelf: 'center'
    },
    confirmButton: {
        backgroundColor: '#F0B5B5',
        width: normalize(176),
        height: normalize(48),
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: normalize(8),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 3,
    }
});