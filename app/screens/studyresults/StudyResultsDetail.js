import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Container, Content, Button } from 'native-base';
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
                    <View style={{display: 'flex', flexDirection: 'row', backgroundColor: '#68ADED', padding: normalize(12)}}>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold, fonts.colorWhite]}>8월 4일 (일) 오후 5:13</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}, fonts.colorWhite]}>중1 비상 (홍민표) 3과</Text>
                        </View>
                    </View>
                    <StudyHeader />
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