import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import WordSpeech from './../components/shared/WordSpeech';
import WordPanel from './../components/shared/WordPanel';
import { fonts, normalize } from './../assets/styles';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { performNetwork } from './../components/shared/global';
import { getWordList } from './../utils/api';
import { getWordListFromMyWord, getWordIdListFromMyWord } from './../utils/MyWord';
import SwipeRender from "react-native-swipe-render";

let pageTitle = '단어 보기';

let arrSpec= [
]

export default class WordView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
        //  arrData: [],
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
            let _word_id_list = await getWordIdListFromMyWord();
            this.setState({mywordidList: _word_id_list});
        }
        /*if(this.props.params.before != 'myword') {
            performNetwork(this, getWordList(this.props.params.category_id)).then((response) => {
                if(response == null) { return; }
                this.setState({arrData: response});
                arrSpec = response;
            });
            let _word_id_list = await getWordIdListFromMyWord();
            this.setState({mywordidList: _word_id_list});
        }
        else {
            this.setState({loaded: false});
            let _word_list = await getWordListFromMyWord();
            this.setState({arrData: _word_list, loaded: true});
        } */
    }
    changeScreen(e) {
        this.setState({curPage: e});
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader 
                    sentence={this.props.params.before != 'myword' ? false : true} 
                    currentNo={this.state.curPage + 1} 
                    totalCount={this.props.arrData.length} title="고1 모의고사 2018년 3월"
                    currentItem={this.props.arrData.length > 0 ? this.props.arrData[this.state.curPage] : null}
                    star={
                        this.props.arrData.length == 0 ? false
                        :
                        (this.state.mywordidList.indexOf(this.props.arrData[this.state.curPage].id) >= 0 ? true : false)
                    } />
                <View style={styles.container}>
                    {
                        
                        <SwipeRender
                            data={this.props.arrData}
                            renderItem={({ item, index }) => {
                                return (
                                    <WordPanel
                                        params = {item}
                                        hideMeaning = {this.state.hideMeaning}
                                        hideExample = {this.state.hideExample}
                                        changeHideMeaning={(e) => { this.setState({hideMeaning: e}) }}
                                        changeHideExample={(e) => { this.setState({hideExample: e}) }}
                                    />
                                );
                            }}    
                            index={0}
                            loop={false}
                            autoplay={false} 
                            enableAndroidViewPager={false}
                            onIndexChanged={(e) => {
                                this.changeScreen(e)   
                            }}
                        />
                        
                    }
                    {
                        /*
                        <SwiperFlatList
                        disableVirtualization={false}
                        onChangeIndex={(e)=>{
                                this.changeScreen(e)
                        }}
                        data={this.props.arrData}
                        renderItem={({ item }) => (
                            <WordPanel
                            params = {item}
                            hideMeaning = {this.state.hideMeaning}
                            hideExample = {this.state.hideExample}
                            changeHideMeaning={(e) => { this.setState({hideMeaning: e}) }}
                            changeHideExample={(e) => { this.setState({hideExample: e}) }}
                             />
                        )}
                        />
                        */
                    }

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#E4E4E4', paddingVertical: normalize(12)}}>
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
                </View>           
            </Container>           
        )
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
    }
});