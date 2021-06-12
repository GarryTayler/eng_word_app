import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList} from 'react-native';
import { Container, Content, Button } from 'native-base';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import Images from './../../assets/Images';
import StudyResultHistoryDetail from './../../components/studyresults/StudyResultHistoryDetail';

const DATA = [
    {
        id: 1, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 2, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 3, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 4, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 5, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 6, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 7, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 8, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
    {
        id: 9, time: '8월 4일 (일) 오후 5:13', detail: '중1 비상 (홍익표) 3과',
        solvedCount: 9, totalCount: 10, mark: 90
    },
];
  
export default class StudyResultsHome extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <View style={{backgroundColor: '#DBEAFE'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: normalize(12)}}>
                        <View style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.totalProblems}>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>총문제</Text>
                            </View>
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(12)}]}>5 문제</Text>
                            </View>
                        </View>
                        <View style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Icon type='evilicon' name='clock' color="#006DFF" size={30} />
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(12)}]}>시간</Text>
                            </View>
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(16)}]}>00:18</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', paddingHorizontal: normalize(24), paddingVertical: normalize(18)}}>
                        <View style={[styles.boxShadow, {flex: 1, backgroundColor: 'white', 
                                    marginRight: normalize(19), paddingVertical: normalize(18),
                                    borderRadius: normalize(8)}]}>
                            <View style={[{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                            paddingHorizontal: normalize(12)}]}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={Images.correct} style={styles.resultIcon} resizeMode='cover' />
                                    <Text style={[fonts.size14, fonts.weightBold, styles.studyTextColor, {marginLeft: normalize(6)}]}>정답</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[fonts.size24, fonts.weightBold, styles.studyTextColor]}>4</Text>
                                    <Text style={[fonts.size14, fonts.weightBold, styles.studyTextColor, {marginLeft: normalize(6)}]}>개</Text>
                                </View>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                            paddingHorizontal: normalize(12)}}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={Images.wrong} style={styles.resultIcon} resizeMode='cover' />
                                    <Text style={[fonts.size14, fonts.weightBold, styles.studyTextColor, {marginLeft: normalize(6)}]}>오답</Text>
                                </View>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[fonts.size24, fonts.weightBold, styles.studyTextColor]}>1</Text>
                                    <Text style={[fonts.size14, fonts.weightBold, styles.studyTextColor, {marginLeft: normalize(6)}]}>개</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.boxShadow, 
                                    {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                                        flex: 1, 
                                        backgroundColor: 'white', marginLeft: normalize(19),
                                        borderRadius: normalize(8)}]}>
                            <Text style={[fonts.size40, fonts.weightBold]}>40</Text>
                            <Text style={[fonts.size24, fonts.weightBold, {color: 'rgba(0,0,0,0.5)', marginLeft: normalize(8)}]}>점</Text>
                        </View>
                    </View>
                </View>
                <Content style={styles.container}>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <StudyResultHistoryDetail id={item.id} time={item.time} detail={item.detail} 
                            solvedCount={item.solvedCount} totalCount={item.totalCount} mark={item.mark} />
                    )}/>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    totalProblems: {
        backgroundColor: '#006DFF',
        paddingVertical: normalize(7),  
        paddingHorizontal: normalize(21),
        borderTopRightRadius: normalize(50),
        borderBottomRightRadius: normalize(50)
    },
    resultIcon: {
        width: 20,
        height: 20
    },
    studyTextColor: {
        color: 'rgba(0, 0, 0, 0.6)'
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
});