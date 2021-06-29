import React from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableHighlight, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import CheckBox from 'react-native-check-box';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import CreateWordItem from './../../components/mymakingwords/CreateWordItem';
import { fonts, normalize, getSafeAreaViewHeight } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';

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
    componentDidMount() {

    }
    doSwap() {
    }
    renderItem() {
        let temp = [];
        for(var i = 1; i<=30;i++) {
            temp.push(i);
        }
        return temp.map((item, index) => {
            return <CreateWordItem currentNo={item} word="" meaning="" />
        })
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                    
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
                                <Text style={[styles.commentText, fonts.familyRegular]}>
                                    단어장 이름을 입력해주세요.
                                </Text>
                                <Text style={[styles.commentText, fonts.familyRegular]}>
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
                                    <Text style={[fonts.size14, fonts.familyRegular, {marginLeft: normalize(8)}]}>전체선택</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    <ScrollView style={styles.scrollView}>
                        {
                            this.renderItem()
                        }
                    </ScrollView>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: normalize(24)}}>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>저장하기</Text>
                        </Button>
                        <Button style={styles.footerButton} onPress={() => Actions.pop()}>
                            <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>닫기</Text>
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
        lineHeight: normalize(18),
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
        height: getSafeAreaViewHeight() - 220
    }
});