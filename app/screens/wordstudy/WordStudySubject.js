import React from 'react';
import { Container, Content, Button, Input } from 'native-base';
import { StyleSheet, View, Text, TextInput, Keyboard, Image } from 'react-native';
import UserHeader from './../../components/shared/UserHeader';
import WordStudyHeader from './../../components/wordstudy/WordStudyHeader';
import { fonts, normalize } from './../../assets/styles';
import Images from './../../assets/Images';

let pageTitle = '단어 학습';

export default class WordStudySubject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cur_problem_no: 1,
            cur_problem_status: 'ready',
            correctProblems: 0, //정답
            wrongProblems: 0, //오답
            answer: ''
        };
    }    
    render() {
        return (
            <Container> 
                <UserHeader title={pageTitle} />
                <WordStudyHeader title="중1비상 (홍민표) 3과"
                                 totalProblems={this.props.params.length} currentNo={this.state.cur_problem_no} rightAnswer="5" wrongAnswer="5" />
                <Content style={styles.container}>
                    <View style={[styles.problemContainer]}>
                        <View style={{position: 'absolute', top: normalize(28)}}>
                            <Text style={[fonts.size14, fonts.familyBold]}>
                                다음 단어의 뜻을 입력해주세요.
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
                    <View style={{ alignItems: 'center'}}>
                        <TextInput
                            style={[styles.textInput, fonts.colorBlack]}
                            onChangeText={(text) => {
                                this.setState({ answer: text });
                            }}
                            onSubmitEditing={Keyboard.dismiss}   
                            value={this.state.answer}
                            placeholder="정답을 입력하세요."
                            placeholderTextColor = 'rgba(0, 0, 0, 0.5)'
                        >
                        </TextInput>
                    </View>
                </Content>
            </Container>
        ); 
    }   
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: normalize(18),
        lineHeight: normalize(18),
        height: normalize(32),
        width: normalize(285),
        paddingTop: normalize(6),
        paddingBottom: normalize(6),
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        fontFamily: 'Malgun-Gothic-Regular'
    },
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
});