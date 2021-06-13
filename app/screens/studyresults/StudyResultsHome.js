import React from 'react';
import { StyleSheet, View, Text, Image, FlatList} from 'react-native';
import { Container, Content } from 'native-base';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import Images from './../../assets/Images';
import StudyResultHistoryDetail from './../../components/studyresults/StudyResultHistoryDetail';
import StudyHeader from './../../components/studyresults/StudyHeader';
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
                <StudyHeader />
                <Content style={styles.container}>
                        <View style={{height: 10}}></View>
                        <FlatList
                            data={DATA}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <StudyResultHistoryDetail id={item.id} time={item.time} detail={item.detail} 
                                solvedCount={item.solvedCount} totalCount={item.totalCount} mark={item.mark} />
                        )}/>
                        <View style={{height: 40}}></View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    },
    boxBadge: {
        height: 26,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', backgroundColor: 'black', top: normalize(-13),
        paddingHorizontal: normalize(4),
        borderRadius: normalize(4)
    },
    historyScrollViewTopMargin: {
        height: normalize(10)
    },
    historyScrollViewBottomMargin: {
        height: normalize(40)
    }
});