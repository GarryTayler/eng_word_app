import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Button } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import WordPanel from './../components/shared/WordPanel';
import { fonts, normalize } from './../assets/styles';
import { performNetwork } from './../components/shared/global';
import { getWordList } from './../utils/api';
import { getWordListFromMyWord, getWordIdListFromMyWord } from './../utils/MyWord';
import { Icon } from 'react-native-elements';
import { showToast } from './../components/shared/global';
import Spinner_bar from 'react-native-loading-spinner-overlay';

let pageTitle = '단어 보기';

export default class WordView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            mywordidList: [],
            curPage: 0,
            hideMeaning: false,
            hideExample: false
        }; 
    }
    componentDidMount() {
        this.fetchWordList();    
    }
    async fetchWordList() {
        if(this.props.params.before != 'myword') {
            performNetwork(this, getWordList(this.props.params.category_id)).then((response) => {
                if(response == null) { return; }
                this.setState({arrData: response});
            });
            let _word_id_list = await getWordIdListFromMyWord();
            this.setState({mywordidList: _word_id_list});
        }
        else {
            this.setState({loaded: false});
            let _word_list = await getWordListFromMyWord();
            this.setState({arrData: _word_list, loaded: true});
        }       
    }
    prevWord() {
        if(this.state.curPage > 0)
            this.setState({curPage: this.state.curPage - 1});
        else
            showToast("first_page_error", "error");
    }
    nextWord() {
        if(this.state.curPage < this.state.arrData.length - 1)
            this.setState({curPage: this.state.curPage + 1});
        else
            showToast("last_page_error", "error");
    }
    moveFirstPage() {
        this.setState({curPage: 0});
    }
    moveLastPage() {
        this.setState({curPage: this.state.arrData.length - 1});
    }
    render() {
        return(
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader
                    myword={this.props.params.before=='myword' ? true : false}
                    currentNo={this.state.curPage + 1} 
                    totalCount={this.state.arrData.length} title="고1 모의고사 2018년 3월"
                    currentItem={this.state.arrData.length > 0 ? this.state.arrData[this.state.curPage] : null}
                    star={
                        this.state.arrData.length == 0 ? false
                        :
                        (this.state.mywordidList.indexOf(this.state.arrData[this.state.curPage].id) >= 0 ? true : false)
                    }
                />
                <Content style={styles.container}>
                {
                    this.state.arrData != null && this.state.arrData.length > 0
                    ?
                    <WordPanel 
                        params = {this.state.arrData[this.state.curPage]}
                        hideMeaning = {this.state.hideMeaning}
                        hideExample = {this.state.hideExample}
                        changeHideMeaning={(e) => { this.setState({hideMeaning: e}) }}
                        changeHideExample={(e) => { this.setState({hideExample: e}) }}
                    />
                    : null
                }
                <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                </Content>

                {
                    this.state.arrData != null && this.state.arrData.length > 0 ?
                        <View style={{backgroundColor: '#E4E4E4', paddingVertical: normalize(12)}}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button style={styles.footerButton}
                                onPress={() => this.setState({hideMeaning: !this.state.hideMeaning})}>
                                    <Text style={[fonts.size15, fonts.familyBold]}>
                                        {
                                            this.state.hideMeaning ? '단어 뜻 보기' : '단어 뜻 가리기'
                                        }
                                        
                                    </Text>
                                </Button>
                                <Button style={styles.footerButton}
                                onPress={() => this.setState({hideExample: !this.state.hideExample})}>
                                    <Text style={[fonts.size15, fonts.familyBold]}>
                                        {
                                            this.state.hideExample ? '예문 해석 보기 ' : '예문 해석 가리기 '
                                        }
                                    </Text>
                                </Button>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                            paddingHorizontal: normalize(8), paddingVertical: normalize(18)}}>
                                <TouchableOpacity activeOpacity={0.6}
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                                onPress={ () => this.prevWord()}>
                                        <Icon name='arrow-back' type='ion-icon' color='#000' size={18} />
                                        <Text style={[fonts.size16, fonts.familyRegular]}>이전단어</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.6}
                                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                                onPress={ () => this.nextWord()}>
                                        <Text style={[fonts.size16, fonts.familyRegular]}>다음단어</Text>
                                        <Icon name='arrow-forward' type='ion-icon' color='#000' size={18} />
                                </TouchableOpacity>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                            paddingHorizontal: normalize(8)}}>
                                <Button style={styles.navigatorButton}
                                onPress={()=>{ this.moveFirstPage() }}>
                                    <Text style={fonts.size12}>
                                        맨처음으로
                                    </Text>
                                </Button>
                                <Button style={styles.navigatorButton}
                                onPress={()=>{ this.moveLastPage() }}>
                                    <Text style={fonts.size12}>
                                        맨끝으로
                                    </Text>
                                </Button>
                            </View>
                        </View>
                        : null
                }
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E4E4',
    },
    footerButton: {
        width: normalize(144),
        height: normalize(44),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(12),
        borderColor: '#EB5757',
        borderWidth: 1,
    },
    navigatorButton: {
        width: normalize(80),
        height: normalize(26),
        backgroundColor: '#E4E4E4',
        borderColor: '#000',
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(12)
    }
});