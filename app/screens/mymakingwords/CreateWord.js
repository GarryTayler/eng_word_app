import React from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableHighlight, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import CheckBox from 'react-native-check-box';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import CreateWordItem from './../../components/mymakingwords/CreateWordItem';
import { fonts, normalize, getSafeAreaViewHeight } from './../../assets/styles';

let pageTitle = '새 단어장 만들기';

export default class CreateWord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newWordTitle: '',
            answer: '',
            allChecked: false,
            isChecked: false
        }
    }
    doSwap() {
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <View style={{ paddingBottom: normalize(10), borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)',
                                    paddingHorizontal: normalize(16), paddingTop: normalize(16) }}>
                            <View style={{ alignItems: 'center'}}>  
                                <TextInput
                                    style={[styles.textInput, fonts.weightBold, fonts.colorBlack]}
                                    onChangeText={(text) => {
                                        this.setState({ newWordTitle: text });
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}   
                                    value={this.state.newWordTitle}
                                    placeholder="단어장 이름"
                                    placeholderTextColor = 'rgba(0, 0, 0, 0.3)'
                                >
                                </TextInput>    
                            </View>
                            <View style={{ alignItems: 'center', marginTop: normalize(12) }}>
                                <Text style={styles.commentText}>
                                    단어장 이름을 입력해주세요.
                                </Text>
                                <Text style={styles.commentText}>
                                    미입력시 오늘 날짜로 저장됩니다.
                                </Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: normalize(16)}}>
                                <CheckBox
                                    onClick={()=>{
                                        this.setState({
                                            allChecked:!this.state.allChecked
                                        })
                                    }}
                                    isChecked={this.state.allChecked}
                                />
                                <TouchableHighlight activeOpacity={0.6} underlayColor='white'
                                onPress={ () => { this.setState({
                                        allChecked:!this.state.allChecked
                                            }) 
                                } }>
                                    <Text style={[fonts.size14, {marginLeft: normalize(8)}]}>전체선택</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <CreateWordItem currentNo={1} word="boys" meaning="소년들" />
                        <CreateWordItem currentNo={2} word="" meaning="" />
                        <CreateWordItem currentNo={3} word="" meaning="" />
                        <CreateWordItem currentNo={4} word="" meaning="" />
                        <CreateWordItem currentNo={5} word="" meaning="" />
                        <CreateWordItem currentNo={6} word="" meaning="" />
                        <CreateWordItem currentNo={7} word="" meaning="" />
                        <CreateWordItem currentNo={8} word="" meaning="" />
                        <CreateWordItem currentNo={9} word="" meaning="" />
                        <CreateWordItem currentNo={10} word="" meaning="" />
                        <CreateWordItem currentNo={11} word="" meaning="" />
                    </ScrollView>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
                paddingVertical: normalize(24)}}>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size16, fonts.colorWhite]}>저장하기</Text>
                        </Button>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size16, fonts.colorWhite]}>닫기</Text>
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
        backgroundColor: '#FFF'
    },
    textInput: {
        fontSize: normalize(20),
        height: normalize(32),
        width: normalize(285),
        paddingTop: normalize(6),
        paddingBottom: normalize(3),
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
    },
    wordInput: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        height: normalize(22),
        paddingTop: normalize(3),
        paddingBottom: normalize(3),
        textAlign: 'left'
    },
    commentText: {
        fontSize: normalize(14),
        lineHeight: normalize(17),
        color: '#1BA3E5'
    },
    footerButton: {
        width: normalize(128),
        height: normalize(44),
        backgroundColor: '#1BA3E5',
        borderRadius: normalize(50),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        height: getSafeAreaViewHeight() - 92
    }
});