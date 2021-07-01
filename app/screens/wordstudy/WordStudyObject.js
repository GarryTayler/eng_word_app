import React from 'react';
import { Container, Content, Button } from 'native-base';
import { StyleSheet, View, Text, Image } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import UserHeader from './../../components/shared/UserHeader';
import ChoiceItem from './../../components/wordstudy/ChoiceItem';
import WordStudyHeader from './../../components/wordstudy/WordStudyHeader';
import Images from './../../assets/Images';
import {Actions} from 'react-native-router-flux';
import TextTicker from 'react-native-text-ticker'
import { getCurrentDate } from './../../components/shared/global';

let pageTitle = '단어 학습';
let problemList = [];

export default class WordStudyObject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cur_problem_no: 1,
            cur_problem_status: 'ready',                
            correctProblems: 0, //정답
            wrongProblems: 0, //오답
            timer: 0
        }
    }
    componentDidMount() {
        problemList = [];
    }
    makeResult(problemNo, _choice) {
        if(problemNo == this.props.params[this.state.cur_problem_no - 1]['correct_index']) {
            problemList.push({
                id: this.props.params[this.state.cur_problem_no - 1]['correct_index'],
                problem: this.props.params[this.state.cur_problem_no - 1]['problem'],
                answer: this.props.params[this.state.cur_problem_no - 1]['correct_answer'],
                user_answer: _choice,
                result: 'correct'
            });

            this.setState({cur_problem_status: 'correct',
                           correctProblems: this.state.correctProblems + 1 });
            setTimeout(function() {
                this.nextProblem();
            }.bind(this), 1000);
        }
        else {
            problemList.push({
                id: this.props.params[this.state.cur_problem_no - 1]['correct_index'],
                problem: this.props.params[this.state.cur_problem_no - 1]['problem'],
                answer: this.props.params[this.state.cur_problem_no - 1]['correct_answer'],
                user_answer: _choice,
                result: 'wrong'
            });
            this.setState({cur_problem_status: 'wrong',
                            wrongProblems: this.state.wrongProblems + 1});
        }
    }
    nextProblem() {
        if(this.state.cur_problem_no == this.props.params.length) { // 학습 완료
            Actions.push("study_results_detail", {
                params: {
                    "totalProblems": this.props.params.length, //총문제
                    "time": this.state.timer, //시간
                    "correctProblems": this.state.correctProblems,  // 정답 
                    "wrongProblems": this.state.wrongProblems,  // 오답
                    "mark": Math.floor(( this.state.correctProblems / this.props.params.length ) * 100),
                    "problemList": problemList,
                    'end_time': getCurrentDate()
                }
            });
        }
        else {
            this.setState({
                cur_problem_no: this.state.cur_problem_no + 1,
                cur_problem_status: 'ready'
            });
        }
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <WordStudyHeader title="중1비상 (홍민표) 31과"
                                 totalProblems={this.props.params.length} currentNo={this.state.cur_problem_no} 
                                 rightAnswer={this.state.correctProblems} wrongAnswer={this.state.wrongProblems}
                                 changeTime={(e) => {this.setState({timer: e})}} />
                <Content style={styles.container}>
                    <View style={styles.problemContainer}>
                        <View style={{position: 'absolute', top: normalize(28)}}>
                            <Text style={[fonts.size14, fonts.familyBold]}>
                                다음 단어의 뜻을 보기에서 선택하세요.
                            </Text>
                        </View>
                        {
                            this.state.cur_problem_status == 'correct' ? 
                            <Image source={Images.correct2x} style={styles.correctIcon} resizeMode='cover' /> :
                            ( this.state.cur_problem_status == 'wrong' ? 
                            <Image source={Images.wrong2x} style={styles.correctIcon} resizeMode='cover' /> :
                                null
                            )
                        }

                        {
                            /*
                            <Text style={[fonts.size38, fonts.familyBold]}>
                                { this.props.params[this.state.cur_problem_no - 1]['problem'] }
                            </Text> */
                        }
                        
                        <TextTicker disabled={this.state.marqueeWordDisable}
                                isInteraction={false} duration={5000} loop
                                repeatSpacer={50} marqueeDelay={1000} style={[fonts.size38, fonts.familyBold]}>
                            { this.props.params[this.state.cur_problem_no - 1]['problem'] }
                        </TextTicker>

                        {
                            this.state.cur_problem_status == 'ready' ? null
                            :
                            <View style={{position: 'absolute', bottom: normalize(40), display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{backgroundColor: (this.state.cur_problem_status == 'correct' ? '#92BEF8' : '#F0B5B5'), borderRadius: normalize(4), padding: normalize(4)}}>
                                    <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>정답</Text>
                                </View>
                                <View style={{marginLeft: normalize(8)}}>
                                    <Text numberOfLines={1} style={[fonts.familyBold, fonts.size18, {color: (this.state.cur_problem_status == 'correct' ? '#92BEF8' : '#F0B5B5')}]}>{ this.props.params[this.state.cur_problem_no - 1]['correct_answer'] }</Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={{paddingHorizontal: normalize(20)}}> 
                    {
                        /*
                        <ChoiceItem index="1" choice="닭, 닭고기" correct />
                        <ChoiceItem index="2" choice="돌, 돌맹이, 바위" />
                        <ChoiceItem index="3" choice="부엌, 주방" />
                        <ChoiceItem index="4" choice="행복한, 기쁜, 즐거움에 겨운" />
                        <ChoiceItem index="5" choice="별, 항성, 유명인" wrong />
                        */
                    }
                    {
                        this.props.params[this.state.cur_problem_no - 1]['choice'] == null ||
                        this.props.params[this.state.cur_problem_no - 1]['choice'].length == 0 
                        ? null
                        :
                        this.props.params[this.state.cur_problem_no - 1]['choice'].map((item, index) => (
                            <ChoiceItem 
                            key={index+1}
                            triggerChoice={(e, _choice) => { this.makeResult(e, _choice) }}
                            index={index + 1} choice={item['problem']}
                            problemNo={item['no']}
                            correct={this.props.params[this.state.cur_problem_no - 1]['correct_index'] == item['no'] && this.state.cur_problem_status == 'correct'
                            ? true : false}
                            wrong={this.props.params[this.state.cur_problem_no - 1]['correct_index'] == item['no'] && this.state.cur_problem_status == 'wrong'
                            ? true : false}
                            status={this.state.cur_problem_status} />
                        ))
                    }
                    </View>
                    {
                        this.state.cur_problem_status == 'wrong' ?
                        <View style={[styles.footerConfirm]}>
                            <Button style={styles.confirmButton}
                            onPress={() => {this.nextProblem()}}>
                                <Text style={[fonts.familyBold, fonts.size18, fonts.colorWhite]}>확인</Text>
                            </Button> 
                        </View>
                        : null
                    }
                </Content>
            </Container>           
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    problemContainer: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: normalize(262), 
        position: 'relative'       
    },
    correctIcon: {
        opacity: 0.5, 
        width: normalize(102), 
        height: normalize(102),
        position: 'absolute',
    },
    footerConfirm: {
        height: normalize(126),
        paddingTop: normalize(18),
        alignSelf: 'center'
    },
    confirmButton: {
        backgroundColor: '#F0B5B5',
        width: normalize(176),
        height: normalize(48),
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        borderRadius: normalize(8),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 3.65,
        elevation: 3,
    }
});