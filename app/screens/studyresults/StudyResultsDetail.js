import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Container, Content } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import StudyHeader from './../../components/studyresults/StudyHeader';
import { fonts, normalize } from './../../assets/styles';

let pageTitle = '학습 결과';

export default class StudyResultsDetail extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content>
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#DBEAFE', padding: normalize(12)}}>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold]}>8월 4일 (일) 오후 5:13</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>중1 비상 (홍민표) 3과</Text>
                        </View>
                    </View>
                    <StudyHeader />
                </Content>
            </Container>    
        );
    }
} 