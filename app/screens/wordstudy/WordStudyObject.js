import React from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, View, Text, Image } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import UserHeader from './../../components/shared/UserHeader';
import ChoiceItem from './../../components/wordstudy/ChoiceItem';
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
                <View style={{backgroundColor: '#68ADED', paddingVertical: normalize(8)}}>                
                        <Text style={[fonts.size18, fonts.weightBold, fonts.colorWhite,
                                    {textAlign: 'center'}]}>중1비상 (홍민표) 3과</Text>
                </View>
                <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', padding: normalize(8),
                    backgroundColor: 'white'}}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1}}>
                            <Text style={[fonts.size14, fonts.colorRed, fonts.weightBold]}>9</Text>
                            <Text style={[fonts.size14, fonts.weightBold]}> / 20</Text>
                            <Icon type='evilicon' name='clock' color="#000" size={30} style={{marginHorizontal: normalize(12)}} />
                            <Text style={[fonts.size14, fonts.weightBold]}>00:03</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                            <Text style={[fonts.size14, fonts.weightBold, {color: 'rgba(0, 0, 0, 0.6)'}]}>
                                정답 : 5
                            </Text>
                            <Text style={[fonts.size14, fonts.weightBold, {color: 'rgba(0, 0, 0, 0.6)', marginLeft: normalize(12)}]}>
                                오답 : 3
                            </Text>
                        </View>
                </View>
                <Content style={styles.container}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: normalize(250), position: 'relative'}}>
                        <View style={{position: 'absolute', top: normalize(28)}}>
                            <Text style={[fonts.size14, fonts.weightBold]}>
                                다음 단어의 뜻을 보기에서 선택하세요.
                            </Text>
                        </View>
                        <Image source={Images.correct2x} style={styles.correctIcon} resizeMode='cover' />
                        <Text style={[fonts.size38, fonts.weightBold]}>
                            chicken
                        </Text>
                    </View>
                    <View style={{paddingHorizontal: normalize(20)}}>
                        <ChoiceItem index="1" choice="닭, 닭고기" correct />
                        <ChoiceItem index="2" choice="돌, 돌맹이, 바위" />
                        <ChoiceItem index="3" choice="부엌, 주방" />
                        <ChoiceItem index="4" choice="행복한, 기쁜, 즐거움에 겨운" />
                        <ChoiceItem index="5" choice="별, 항성, 유명인" wrong />
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
    choiceItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: normalize(44),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(12),
        borderRadius: normalize(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    correctIcon: {
        opacity: 0.5, 
        width: normalize(102), 
        height: normalize(102),
        position: 'absolute',
    }
});