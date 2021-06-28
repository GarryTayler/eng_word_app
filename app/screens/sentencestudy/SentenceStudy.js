import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Keyboard, TextInput } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Button } from 'native-base';
import StudyHeader from './../../components/shared/StudyHeader';
import SentenceStudyItem from './../../components/sentencestudy/SentenceStudyItem';
import {performNetwork} from './../../components/shared/global';
import {getSentenceList} from './../../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {getSentenceListFromMySentence} from './../../utils/MySentence';
import {Actions} from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import { Icon } from 'react-native-elements';
let pageTitle = '문장 학습';

export default class SentenceStudy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            wordList: [{id: 0, word: 'his magic show', clicked: false}, 
                        {id: 1, word: 'invited', clicked: false}, 
                        {id: 2, word: 'Jinho', clicked: false},
                        {id: 3, word: 'me', clicked: false}, 
                        {id: 4, word: 'the another day', clicked: false}, 
                        {id: 5, word: 'the other day', clicked: false},
                        {id: 6, word: 'to', clicked: false},
                        {id: 7, word: '', clicked: false}],
            correct: false,
            confirmAnswer: false,
            inputAnswer: '',
            correctAnswer: 'Correct Answer'
        };
    }    

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    confirm() {
        this.setState({confirmAnswer: true})
        if(this.state.inputAnswer == this.state.correctAnswer) {
            this.setState({correct: true})
        } else {
            this.setState({correct: false})
        }
    }
    again() {
        this.setState({inputAnswer: ''});
        let wordList = this.state.wordList;
        if(wordList && wordList.length > 0) {
            wordList.map((item ,index) => {
                wordList[index]['clicked'] = false;
            })
            this.setState({wordList: wordList})
        }
        this.setState({confirmAnswer: false})
    }

    renderWord(item, index) {
        if(item.word && !item.clicked)
            return <TouchableOpacity style={[styles.word, {backgroundColor: index % 4 == 0 ? '#5DABDD' : index % 4 == 1 ? '#F0B6B7' : index % 4 == 2 ? '#F4D9A7' : '#F1BE9C'}]} onPress={() => this.clickWorkd(item)}>
                <Text style={fonts.size14}>{item.word}</Text>
            </TouchableOpacity>
        else
            return <View style={styles.word}></View>
    }

    clickWorkd(word) {
        let temp = this.state.inputAnswer;
        if(temp) {
            temp += " " + word.word
        } else {
            temp = word.word
        }
        this.setState({inputAnswer: temp});
        let wordList = this.state.wordList;
        if(wordList && wordList.length > 0) {
            wordList.map((item ,index) => {
                if(item.id == word.id) {
                    wordList[index]['clicked'] = true;
                }
            })
            this.setState({wordList: wordList})
        }
    }

    reset() {
        console.log('here');
    }

    render()  {
        return (
            <Container>
                <StudyHeader title={pageTitle} />
                <View style={{paddingHorizontal: 12, paddingTop: 13}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.backButtonPressed()}>
                            <Icon name='star' type='antdesign' size={20} color='grey' /> 
                        </TouchableOpacity>
                        <Text style={[{paddingLeft: 6, fontSize: 14, lineHeight: 20}]}>1. 진호가 며칠전에 그의 마술쇼에 나를 초대했다.</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => this.again()}>
                        <Icon name='closecircle' type='antdesign' size={20} color='#828282' /> 
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.textInput, fonts.colorBlack]}
                        onChangeText={(text) => {
                            this.setState({ inputAnswer: text });
                        }}
                        textDecorationLine={this.state.confirmAnswer && !this.state.correct ? "line-through" : ''}
                        onSubmitEditing={Keyboard.dismiss}   
                        value={this.state.inputAnswer}
                        editable={false}
                    >
                    </TextInput>
                </View>

                <TextInput
                    style={[styles.textInput,{borderBottomColor: '#E1E1E1', color: '#E1E1E1'}]}
                    onSubmitEditing={Keyboard.dismiss}   
                    value={this.state.confirmAnswer ? this.state.correctAnswer : ''}
                    editable={false}
                >
                </TextInput>
                {
                    this.state.confirmAnswer && !this.state.correct ?
                    <View style={[styles.container, styles.scrollView, {justifyContent: 'center'}]}>
                        <Icon name='close' type='antdesign' size={60} color='#EB5757' /> 
                    </View>
                    :
                    this.state.confirmAnswer && this.state.correct ?
                    <View style={[styles.container, styles.scrollView, {justifyContent: 'center'}]}>
                        <Icon name='circle' type='entypo' size={60} color='#006DFF' /> 
                    </View>
                    :
                    <FlatList
                        style={[styles.container, styles.scrollView]}
                        columnWrapperStyle={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}
                        data={this.state.wordList}
                        keyExtractor={(item) => item.id}
                        renderItem={ ({item, index}) => (
                            this.renderWord(item, index)
                        )}
                        ListFooterComponent={
                            <>
                            <View style={styles.contentPaddingBottom}></View>   
                            <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                            </>    
                        }
                        numColumns={4}
                    />
                }

                <View style={{display: 'flex', flexDirection: 'row', paddingVertical: normalize(10), justifyContent: 'space-evenly'}}>
                    {
                        this.state.confirmAnswer ?
                        <>
                            <Button style={styles.footerButton}>
                                <Text style={[fonts.size16, fonts.colorWhite]}>이전문제</Text>
                            </Button>
                            <Button style={styles.footerButton} onPress={() => this.again()}>
                                <Text style={[fonts.size16, fonts.colorWhite]}>다시 풀기</Text>
                            </Button>
                            <Button style={styles.footerButton}>
                                <Text style={[fonts.size16, fonts.colorWhite]}>다음문제</Text>
                            </Button>
                        </>
                        :
                        <Button style={styles.footerButton} onPress={() => this.confirm()}>
                            <Text style={[fonts.size16, fonts.colorWhite]}>정답확인</Text>
                        </Button>
                    }
                </View>
                
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingTop: normalize(6), 
        paddingBottom: normalize(30)
    },
    korStudySen: {
        fontSize: normalize(16),
        lineHeight: normalize(24)
    },
    footerButton: {
        width: normalize(96),
        height: normalize(44),
        borderRadius: normalize(50),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1BA3E5'
    },
    contentPaddingBottom: {
        height: normalize(30)
    },
    word: {
        borderRadius: 8,
        height: 40,
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    textInput: {
        fontSize: normalize(14),
        height: normalize(28),
        paddingTop: normalize(6),
        paddingBottom: normalize(6),
        marginHorizontal: 15,
        borderBottomWidth: 1,
        marginTop: 8,
        borderColor: 'rgba(0,0,0,0.5)',
    },
});