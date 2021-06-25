import React from 'react';
import { View, Text } from 'react-native';
import ResultDetailItem from './../../components/studyresults/ResultDetailItem';
export default class StudyResultsDetailTab extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <ResultDetailItem currentNo={1} word="boy" meaning="소년, 남자, 사내아이, 보이" correct />
                <ResultDetailItem currentNo={2} word="create" meaning="재미있는, 유쾌한, 신나는"
                correctAnswer="~을 만들다, (몹시) 떠들어 대다" />
                <ResultDetailItem currentNo={3} word="girl" meaning="소녀, 여자, 계집아이" correct />
                <ResultDetailItem currentNo={4} word="dream" meaning="꿈, 꿈꾸다, 몽상하다" correct />
                <ResultDetailItem currentNo={5} word="dream" meaning="꿈, 꿈꾸다, 몽상하다" correct />
                <ResultDetailItem currentNo={6} word="dream" meaning="꿈, 꿈꾸다, 몽상하다" correct />
            </View>
        );
    }
}