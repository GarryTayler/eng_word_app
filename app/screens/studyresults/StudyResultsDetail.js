import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import { Container, Content, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
import StudyResultsDetailTab from './StudyResultsDetailTab';
import { fonts, normalize, tabs } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
import {addToStudyResults, removeFromStudyResults} from './../../utils/StudyResults';

let pageTitle = '학습 결과';
let arrTypes = [
    { id: 0, title: '전체', result: '' }, 
    { id: 1, title: '정답', result: 'correct' }, 
    { id: 2, title: '오답', result: 'wrong' }
];

export default class StudyResultsDetail extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }
    async saveAndFinish() {
        await addToStudyResults({
            "end_time": this.props.params.end_time,
            "category": "중1 비상 (홍익표) 3과",
            "totalProblems": this.props.params.totalProblems,
            "correctProblems": this.props.params.correctProblems,
            "mark": this.props.params.mark
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
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly',
                                paddingTop: normalize(16),
                                paddingBottom: normalize(8)}}>
                        <Button style={[styles.footerButton]}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>전체</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={[styles.footerButton]}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>틀린 문제</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>별표 저장</Text>
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