import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Button, Tab, Tabs, ScrollableTab } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
//import StudyResultsDetailTab from './StudyResultsDetailTab';
import { fonts, normalize, tabs } from './../../assets/styles';
import { Actions } from 'react-native-router-flux';
import { performNetwork } from './../../components/shared/global';
import { getRecentStudy } from './../../utils/RecentStudy';

let pageTitle = '학습 결과';
let arrTypes = [
    { id: 0, title: '전체', result: '' }, 
    { id: 1, title: '정답', result: 'correct' }, 
    { id: 2, title: '오답', result: 'wrong' }      
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
                    {
                        /* 
                        <StudyHeader
                            totalProblems={this.props.params.totalProblems}
                            correctProblems={this.props.params.correctProblems}
                            wrongProblems={this.props.params.wrongProblems}
                            mark={this.props.params.mark}
                            time={this.timeFormat()}
                        />
                        */
                    }
                    <View style={{height: normalize(20), backgroundColor: '#F4F4F4'}}>
                    </View>                    
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



