import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
import StudyResultsDetailTab from './StudyResultsDetailTab';
import { fonts, normalize, tabs } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import { getRecentStudy } from './../../utils/RecentStudy';
import Spinner_bar from 'react-native-loading-spinner-overlay';

let pageTitle = '학습 결과';
let arrTypes = [
    { id: 0, title: '전체', result: '' }, 
    { id: 1, title: '정답', result: true }, 
    { id: 2, title: '오답', result: false }      
];

export default class SentenceResultsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            studyResultTitle: '중1 비상 (홍민표) 3과'
        }
    }
    async componentDidMount() {
        if(this.props.params.category.before == 'detail') {
            let selectedStudy = await getRecentStudy();
            if(selectedStudy) {
                this.setState({studyResultTitle: selectedStudy.selectedName})
            }
        }
        else if(this.props.params.category.before == 'mysentence') {
            this.setState({studyResultTitle: '내문장'});       
        }
    }
    saveAndFinish() {
    }
    finish() {
    }
    resolveAll() {
    }
    resolveWrongProblems() {
    }
    renderTabs() {
        let arrTab = arrTypes.map((item, index) => (
            <Tab key = {index}
                heading={ item.title }
                tabStyle={ tabs.tab }           
                activeTabStyle={ tabs.tabItem }
                textStyle={ tabs.text }
                activeTextStyle={ tabs.activeText } >
                <StudyResultsDetailTab
                    problemList={ this.props.params.problemList.filter(item1 => item1.correct==item.result || item.result === '') }
                    before={ this.props.params.category.before }
                    isSentence
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
                            <Text style={[fonts.size14, fonts.familyBold, fonts.colorWhite]}>
                                { this.props.params.end_time }
                            </Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.familyBold, {textAlign: 'right'}, fonts.colorWhite]}>
                                {this.state.studyResultTitle}
                            </Text>
                        </View>
                    </View>
                    <StudyHeader
                        totalProblems={this.props.params.totalProblems}
                        correctProblems={this.props.params.correctProblems}
                        wrongProblems={this.props.params.wrongProblems}
                        mark={this.props.params.mark}
                        time=""
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
                        onPress={() => {this.saveAndFinish()}} disabled={this.props.params.disabledStorage}>
                        <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>학습 내용</Text>
                        <Text style={[fonts.size15, fonts.colorWhite, fonts.familyBold, {textAlign: 'center'}]}>저장후 끝내기</Text>
                    </Button>
                </View>
            </Container>
        )
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



