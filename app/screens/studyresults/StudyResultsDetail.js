import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import { Container, Content, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
import ResultDetailItem  from './../../components/studyresults/ResultDetailItem';
import StudyResultsDetailTab from './StudyResultsDetailTab';
import { fonts, normalize, tabs } from './../../assets/styles';
import { Icon } from 'react-native-elements';

let pageTitle = '학습 결과';
let arrTypes = [
    { id: 0, title: '전체' }, 
    { id: 1, title: '정답' }, 
    { id: 2, title: '오답' }
];

export default class StudyResultsDetail extends React.Component {
    constructor(props){
        super(props);
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
                />
            </Tab>
        ));

        return (
            <Tabs tabBarBackgroundColor='#F4F4F4'
            tabBarUnderlineStyle={ tabs.tabBarUnderline } 
            style={{ shadowOpacity: 0 }}
            renderTabBar={()=> 
                <ScrollableTab 
                tabsContainerStyle={{
                    justifyContent: 'flex-start'
                }}
                style={{height: normalize(32), borderBottomWidth: 0}} 
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
                <Content>
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#68ADED', padding: normalize(12)}}>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold, fonts.colorWhite]}>8월 4일 (일) 오후 5:13</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}, fonts.colorWhite]}>중1 비상 (홍민표) 3과</Text>
                        </View>
                    </View>
                    <StudyHeader />

                    { this.renderTabs() }

                    <ResultDetailItem currentNo={1} word="boy" meaning="소년, 남자, 사내아이, 보이" correct />
                    <ResultDetailItem currentNo={2} word="create" meaning="재미있는, 유쾌한, 신나는"
                    correctAnswer="~을 만들다, (몹시) 떠들어 대다" />
                    <ResultDetailItem currentNo={3} word="girl" meaning="소녀, 여자, 계집아이" correct />
                    <ResultDetailItem currentNo={4} word="dream" meaning="꿈, 꿈꾸다, 몽상하다" correct />


                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly',
                                paddingTop: normalize(16)}}>
                        <Button style={[styles.footerButton]}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>전체</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={[styles.footerButton]}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>틀린 문제</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>다시 풀기</Text>
                        </Button>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>별표 저장</Text>
                        </Button>
                        <Button style={[styles.footerButton]}>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>학습 내용</Text>
                            <Text style={[fonts.size15, fonts.colorWhite, fonts.weightBold, {textAlign: 'center'}]}>저장후 끝내기</Text>
                        </Button>
                    </View>
                </Content>
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