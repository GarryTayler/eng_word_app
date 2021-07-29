import React from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard, TouchableHighlight, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import CheckBox from 'react-native-check-box';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import CreateWordItem from './../../components/mymakingwords/CreateWordItem';
import { fonts, normalize, getSafeAreaViewHeight } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import { saveVocabularyData, getVocabularyData } from '../../utils/MyMakingWords';
import { generateMyMakingWordId } from './../../components/shared/global';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner_bar from 'react-native-loading-spinner-overlay';
let pageTitle = '새 단어장 만들기';

export default class CreateWord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newWordTitle: this.props.wordName ? this.props.wordName : '',
            originName: this.props.wordName ? this.props.wordName : '',
            answer: '',
            arrData: [],
            allChecked: false,
            isChecked: false,
            id: this.props.id,
            editable: this.props.editable,
            loaded: true
        }
    }
    async componentDidMount() {
        this.setState({loaded: false});
        let temp = [];
        for(var i = 1; i<=100;i++) {
            temp.push({id: 0, word: '', meaning: '', checked: false, layoutId: i});
        }
        if(this.state.editable) {
            let wordTemp = await getVocabularyData(this.props.id);

            console.log("word list=======>", wordTemp);

            if(wordTemp && wordTemp.length > 0) {
                wordTemp.map((item, index) => {
                    temp[index] = {id: item.id, word: item.word, meaning: item.meaning, checked: false, layoutId: index + 1};
                })
            }
        }
        this.setState({arrData: temp, loaded: true});
    }
    componentWillUnmount () {
    }
    async saveMyWord() {
        this.setState({loaded: false});
        let temp = [];
        this.state.arrData.map((item ,index) => {
            if(item.word || item.meaning) {
                if(item.id == 0) {
                    temp.push({word: item.word, meaning: item.meaning, id: generateMyMakingWordId()})
                }
                else {
                    temp.push({word: item.word, meaning: item.meaning, id: item.id})
                }
            }
        })
        let wordName = this.state.newWordTitle;
        if(wordName == '') {
            wordName = this.formatDate()
        }
        if(this.state.editable && this.state.newWordTitle == this.state.originName) {
            wordName = '';
        }

        await saveVocabularyData(this.state.id, wordName, temp)
        this.setState({loaded: true});
        Actions.pop();
        setTimeout(function() {
            Actions.refresh();
        }, 300);
    }
    formatDate() {
        var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return year+"."+month+"."+day;
    }
    changeWord(text, index) {
        this.state.arrData[index]['word'] = text;
    }
    changeMeaning(text, index) {
        this.state.arrData[index]['meaning'] = text;
    }
    checkedWord(index) {
        this.state.arrData[index]['checked'] = !this.state.arrData[index]['checked'];
    }
    renderCreateWord(item, index) {
        return <CreateWordItem key={index} currentNo={index} word={item.word} changeWord={(text) => this.changeWord(text, index)} meaning={item.meaning} changeMeaning={(text) => this.changeMeaning(text, index)} isChecked={item.checked} checkedWord={() => this.checkedWord(index)} />
    }
    async remove() {
        let temp = this.state.arrData;
        if(temp && temp.length > 0) {
            temp.map((item, index) => {
                if(item.checked) {
                    temp[index]['word'] = '';
                    temp[index]['meaning'] = '';
                    temp[index]['id'] = 0;
                    temp[index]['checked'] = false;
                }
            })
            if(this.state.id) {
                let temp_word = [];
                temp.map((item ,index) => {
                    if(item.word || item.meaning) {
                        temp_word.push({word: item.word, meaning: item.meaning})
                    }
                })
                let wordName = this.state.newWordTitle;
                if(wordName == '') {
                    wordName = this.formatDate()
                }
                if(this.state.editable && this.state.newWordTitle == this.state.originName) {
                    wordName = '';
                }
                
                await saveVocabularyData(this.state.id, wordName, temp_word)
            }
            
            this.setState({arrData: temp})
            this.setState({allChecked: false})
        }
    }
    checkedAll() {
        let temp = this.state.arrData;
        if(this.state.allChecked) {
            temp.map((item, index) => {
                temp[index]['checked'] = false
            })
        } else {
            temp.map((item, index) => {
                temp[index]['checked'] = true
            })
        }
        
        this.setState({arrData: temp})
        this.setState({
            allChecked:!this.state.allChecked
        })
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} remove={true} remove={() => this.remove()} />
                
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
                                    
                                    this.checkedAll()
                                }}
                                isChecked={this.state.allChecked}
                            />
                            <TouchableHighlight activeOpacity={0.6} underlayColor='white'
                            onPress={ () => { this.checkedAll() } }>
                                <Text style={[fonts.size14, fonts.familyRegular, {marginLeft: normalize(8)}]}>전체선택</Text>
                            </TouchableHighlight>
                        </View>
                </View>
                <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        scrollEnabled={true}
                        
                    >
                    {
                        this.state.arrData.length > 0 ?
                        <OptimizedFlatList
                            style={[styles.container, {paddingHorizontal: normalize(10)}]}
                            data={this.state.arrData}
                            keyExtractor={(item) => item.layoutId}
                            renderItem={ ({item, index}) => (
                                this.renderCreateWord(item, index)
                            )}
                            removeClippedSubviews={true}
                            initialNumToRender={20}
                            maxToRenderPerBatch={10}
                        />
                        :
                        null
                    }
                </KeyboardAwareScrollView>
                
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: normalize(24)}}>
                    <Button style={styles.footerButton} onPress={() => this.saveMyWord()}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>저장하기</Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => Actions.pop()}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>닫기</Text>
                    </Button>
                </View>
                <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
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