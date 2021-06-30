import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Keyboard, TextInput, Image } from 'react-native';
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
import Images from './../../assets/Images';
import { showToast } from '../../components/shared/global';
import { addToMySentence, removeFromMySentence, getSentenceIdListFromMySentence } from './../../utils/MySentence'
let pageTitle = '문장 학습';

export default class SentenceStudy extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            wordList: [],
            correct: false,
            confirmAnswer: false,
            inputAnswer: '',
            correctAnswer: null,
            curIndex: 0,
            curQuestion: null,
            sentenceList: this.props.sentenceList,
            mySetenceIdList: []
        };
    }    

    async componentDidMount() {
        Orientation.lockToLandscape();
        this.setState({correctAnswer: this.state.sentenceList[this.state.curIndex].sentence})
        let curSetence = this.state.sentenceList[this.state.curIndex];
        let idList = await getSentenceIdListFromMySentence();
        
        if(idList && idList.length > 0) {
            idList.map((item, index) => {
                if(idList.id == item)
                    curSetence['isFavorite'] = true
            })
        } else {
            curSetence['isFavorite'] = false
        }
        this.setState({curQuestion: curSetence})

        let temp = this.state.sentenceList[this.state.curIndex].parts;
        if(temp && temp.length > 0) {
            let wordList = []
            temp.map((item, index) => {
                wordList.push({id: index, word: item, clicked: false})
            })
            if(wordList.length % 4 == 1) {
                wordList.push({id: wordList.length, word: '', clicked: false})
                wordList.push({id: wordList.length + 1, word: '', clicked: false})
                wordList.push({id: wordList.length + 2, word: '', clicked: false})
            } else if(wordList.length % 4 == 2) {
                wordList.push({id: wordList.length, word: '', clicked: false})
                wordList.push({id: wordList.length+1, word: '', clicked: false})
            } else if(wordList.length % 4 == 3) {
                wordList.push({id: wordList.length, word: '', clicked: false})
            }
            this.setState({wordList})
        }
    }

    componentWillUnmount() {
        Orientation.unlockAllOrientations();
    }

    confirm() {
        this.setState({confirmAnswer: true})
        let correctAnswer = this.state.correctAnswer.replace(/[^a-zA-Z ]/g, "")
        
        if(this.state.inputAnswer == correctAnswer) {
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

    async isFav() {
        let curSetence = this.state.curQuestion
        curSetence['isFavorite'] = !curSetence['isFavorite']
        this.setState({curQuestion: curSetence})

        if(curSetence['isFavorite']) {
            if( await addToMySentence(this.state.sentenceList[this.state.curIndex]) ) {
                showToast("add_to_mysentence", "success");
            }
        }
        else {
            if( await removeFromMySentence(this.state.sentenceList[this.state.curIndex]) ) {
                showToast("remove_from_mysentence", "success");
            }
        }

    }

    async chooseSetence(prev_next) {
        let curIndex = this.state.curIndex
        if(prev_next == -1)
            curIndex = curIndex - 1;
        else
            curIndex = curIndex + 1;
        this.setState({correct: false})
        this.setState({confirmAnswer: false})
        this.setState({inputAnswer: ''})
        this.setState({correctAnswer: this.state.sentenceList[curIndex].sentence})
        
        let curSetence = this.state.sentenceList[curIndex];
        let idList = await getSentenceIdListFromMySentence();
        
        if(idList && idList.length > 0) {
            idList.map((item, index) => {
                if(idList.id == item)
                    curSetence['isFavorite'] = true
            })
        } else {
            curSetence['isFavorite'] = false
        }
        
        this.setState({curQuestion: curSetence})

        let temp = this.state.sentenceList[curIndex].parts;
        if(temp && temp.length > 0) {
            let wordList = []
            temp.map((item, index) => {
                wordList.push({id: index, word: item, clicked: false})
            })
            if(wordList.length % 4 == 1) {
                wordList.push({id: wordList.length, word: '', clicked: false})
                wordList.push({id: wordList.length + 1, word: '', clicked: false})
                wordList.push({id: wordList.length + 2, word: '', clicked: false})
            } else if(wordList.length % 4 == 2) {
                wordList.push({id: wordList.length, word: '', clicked: false})
                wordList.push({id: wordList.length+1, word: '', clicked: false})
            } else if(wordList.length % 4 == 3) {
                wordList.push({id: wordList.length, word: '', clicked: false})
            }
            this.setState({wordList})
        }
        this.setState({curIndex: curIndex})
    }

    endStudy() {
        Actions.pop();
        setTimeout(function() {
            Actions.refresh()
        }, 300)
    }

    render()  {
        return (
            <Container>
                <StudyHeader title={pageTitle} />
                <View style={{paddingHorizontal: 12, paddingTop: 13}}>
                    {
                        this.state.curQuestion ?
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => this.isFav()}>
                                <Icon name='star' type='antdesign' size={20} color={this.state.curQuestion.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} /> 
                            </TouchableOpacity>
                            <Text style={[{paddingLeft: 6, fontSize: 14, lineHeight: 20}]}>{this.state.curIndex + 1}.  {this.state.curQuestion.meaning}</Text>
                        </View>
                        :
                        null
                    }
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
                    <View style={[styles.container, styles.scrollView, {justifyContent: 'center', alignItems: 'center'}]}>
                        <Image source={Images.wrong2x} style={styles.resultIcon} resizeMode='cover' />
                    </View>
                    :
                    this.state.confirmAnswer && this.state.correct ?
                    <View style={[styles.container, styles.scrollView, {justifyContent: 'center', alignItems: 'center'}]}>
                        <Image source={Images.correct2x} style={styles.resultIcon} resizeMode='cover' />
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
                        {
                            this.state.curIndex > 0 ?
                            <Button style={styles.footerButton} onPress={() => this.chooseSetence(-1)}>
                                <Text style={[fonts.size16, fonts.familyRegular, fonts.colorWhite]}>이전문제</Text>
                            </Button>
                            :
                            <View style={[styles.footerButton, {backgroundColor: 'white'}]}>
                            </View>
                        }
                            <Button style={styles.footerButton} onPress={() => this.again()}>
                                <Text style={[fonts.size16, fonts.familyRegular, fonts.colorWhite]}>다시 풀기</Text>
                            </Button>
                        {
                            this.state.curIndex == this.state.sentenceList.length - 1 ?
                            <Button style={styles.footerButton} onPress={() => this.endStudy()}>
                                <Text style={[fonts.size16, fonts.familyRegular, fonts.colorWhite]}>학습 끝</Text>
                            </Button>
                            :
                            <Button style={styles.footerButton} onPress={() => this.chooseSetence(1)}>
                                <Text style={[fonts.size16, fonts.familyRegular, fonts.colorWhite]}>다음문제</Text>
                            </Button>
                        }
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
    resultIcon: {
        width: 60,
        height: 60
    },
});