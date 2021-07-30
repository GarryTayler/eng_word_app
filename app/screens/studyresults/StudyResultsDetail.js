import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
import StudyResultsDetailTab from './StudyResultsDetailTab';
import { fonts, normalize, tabs } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import { addToStudyResults } from './../../utils/StudyResults';
import { showToast, shuffleArray, generate } from './../../components/shared/global';
import { performNetwork } from './../../components/shared/global';
import { getWordList } from './../../utils/api';
import { getWordListFromMyWord } from './../../utils/MyWord';
import { getVocabularyData } from './../../utils/MyMakingWords';
import Spinner_bar from 'react-native-loading-spinner-overlay';

let pageTitle = '학습 결과';
let arrTypes = [
    { id: 0, title: '전체', result: '' }, 
    { id: 1, title: '정답', result: 'correct' }, 
    { id: 2, title: '오답', result: 'wrong' }
];

export default class StudyResultsDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true
        };
    }
    componentDidMount() {
    }
    async saveAndFinish() {
        await addToStudyResults({
            "end_time": this.props.params.end_time,
            "category": "중1 비상 (홍익표) 3과",
            "totalProblems": this.props.params.totalProblems,
            "correctProblems": this.props.params.correctProblems,
            "mark": this.props.params.mark,
            "time": this.timeFormat()
        });
        Actions.popTo('word_study_init');
    }
    timeFormat() {
        let ss = this.props.params.time % 60;
        if(ss <= 9) ss = '0' + ss;
        let mm = Math.floor(this.props.params.time / 60);
        if(mm <= 9) mm = '0' + mm;
        return mm + ':' + ss;
    }
    finish() {
        Actions.popTo('word_study_init');
    }
    async fetchWordList() {
        /*
        category: {
                    before: this.props.params.before,
                    category_id: this.props.params.before == 'detail' ? this.props.params.category_id : 
                                    (this.props.params.before == 'myword' ? 0 : this.props.params.dictionary_id)
        }
        */
       try {
            if(this.props.params.category.before == 'detail') {
                let response = await performNetwork( this, getWordList(this.props.params.category.category_id) );
                return response;
            }
            else if(this.props.params.category.before == 'myword') {
                this.setState({loaded: false});
                let response = await getWordListFromMyWord();
                this.setState({loaded: true});
                return response;
            }
            else if(this.props.params.category.before == 'mymakingword') {
                this.setState({loaded: false});
                let response = await getVocabularyData(this.props.params.category.category_id);
                this.setState({loaded: true});
                return response;
            }
            return [];
       }
       catch(err) {
           return [];
       }
    }
    async resolveAll() {
        let _problems = [];
        if(this.props.params.type == 'sub') { //주관식
            for(let i = 0; i < this.props.params.problemList.length; i ++) {
                _problems.push({
                    'word_id': this.props.params.problemList[i].word_id,
                    'problem': this.props.params.problemList[i].problem,
                    'answer': this.props.params.problemList[i].answer
                })
            }
            if(this.props.params.progressOrder != 'sequence') { //단어 진행 순서
                _problems = shuffleArray(_problems);
            }
            Actions.push('word_study_subject', {
                params: _problems,
                studyMethod: this.props.params.studyMethod,
                progressOrder: this.props.params.progressOrder,
                type: 'sub'
            });
        }
        else { //객관식
            let _arrData = await this.fetchWordList();
            if(_arrData.length < 5) {
                showToast("object_word_study_shortage_problem", "error");
                return;
            }
            for(let i = 0; i < this.props.params.problemList.length; i ++) {
                _problems.push({
                    'word_id': this.props.params.problemList[i].word_id,
                    'problem': this.props.params.problemList[i].problem,
                    'correct_index': this.props.params.problemList[i]['id'],
                    'correct_answer': this.props.params.problemList[i]['answer'],
                    'choice': generate(this.props.params.problemList[i]['id'], _arrData.length).map(x => ( {no: x, problem: (this.props.params.studyMethod == 'entoko' ? _arrData[x-1].meaning : _arrData[x-1].word)} ) )
                });
            }
            if(this.props.params.progressOrder != 'sequence') { //단어 진행 순서
                _problems = shuffleArray(_problems);
            }
            Actions.push('word_study_object', {
                params: _problems,
                studyMethod: this.props.params.studyMethod,
                progressOrder: this.props.params.progressOrder,
                type: 'obj',
                category: this.props.params.category
            });
        }
    }
    resolveWrongProblems() {
        let _problems = [];
        if(this.props.params.type == 'sub') { //주관식
            for(let i = 0; i < this.props.params.problemList.length; i ++) {
                if(this.props.params.problemList[i].result != 'correct')
                    _problems.push({
                        'word_id': this.props.params.problemList[i].word_id,
                        'problem': this.props.params.problemList[i].problem,
                        'answer': this.props.params.problemList[i].answer
                    })
            }
            if(this.props.params.progressOrder != 'sequence') { //단어 진행 순서
                _problems = shuffleArray(_problems);
            }
            Actions.push('word_study_subject', {
                params: _problems,
                studyMethod: this.props.params.studyMethod,
                progressOrder: this.props.params.progressOrder,
                type: 'sub'
            });
        }
        else { //객관식
        }
    }
    renderTabs() {
        let arrTab = arrTypes.map((item, index) => (
            <Tab key={ index }
                heading={ item.title }
                tabStyle={ tabs.tab }
                activeTabStyle={ tabs.tabItem }
                textStyle={ tabs.text }
                activeTextStyle={ tabs.activeText } >
                <StudyResultsDetailTab
                    parent={ this }
                    typeData={ item }
                    problemList={ this.props.params.problemList.filter(item1 => item1.result==item.result || item.result == '') }
                />
            </Tab>
        ));

        return (
            <Tabs tabBarBackgroundColor='#F4F4F4'
            tabBarUnderlineStyle={ tabs.tabBarUnderline } 
            renderTabBar={()=> 
                <ScrollableTab 
                tabsContainerStyle={tabs.scrollTabContainerStyle}
                style={tabs.scrollTabStyle} 
                />}
            >
                { arrTab }
            </Tabs>
        );
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                    <View>
                        <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#68ADED', padding: normalize(12)}}>
                            <View style={{flex: 1}}>
                                <Text style={[fonts.size14, fonts.familyBold, fonts.colorWhite]}>{this.props.params.end_time}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={[fonts.size14, fonts.familyBold, {textAlign: 'right'}, fonts.colorWhite]}>중1 비상 (홍민표) 3과</Text>
                            </View>
                        </View>
                        <StudyHeader
                            totalProblems={this.props.params.totalProblems}
                            correctProblems={this.props.params.correctProblems}
                            wrongProblems={this.props.params.wrongProblems}
                            mark={this.props.params.mark}
                            time={this.timeFormat()}
                        />
                        <View style={{height: normalize(20), backgroundColor: '#F4F4F4'}}>
                        </View>
                    </View>
                    { this.renderTabs() }
                    <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly',
                                paddingTop: normalize(16),
                                paddingBottom: normalize(8)}}>
                        <Button style={[styles.footerButton]}
                        onPress={()=> {this.resolveAll()}}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>전체</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={[styles.footerButton]}
                        onPress={()=> {this.resolveWrongProblems()}}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>틀린 문제</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={styles.footerButton}
                            onPress={() => {this.finish()}}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>끝내기</Text>
                        </Button>
                        <Button style={[styles.footerButton]}
                        onPress={() => {this.saveAndFinish()}}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>학습 내용</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>저장후 끝내기</Text>
                        </Button>
                    </View>
            </Container>    
        );
    }
} 

const styles = StyleSheet.create({
    footerButton: {
        width: normalize(152),
        height: normalize(48),
        borderRadius: normalize(12),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#2D9CDB',
        marginBottom: normalize(8)
    }
});