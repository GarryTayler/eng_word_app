import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import SubHeader from './../../components/shared/SubHeader';
import SentenceStudyItem from './../../components/sentencestudy/SentenceStudyItem';
import {performNetwork} from './../../components/shared/global';
import {getSentenceList} from './../../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {getSentenceListFromMySentence} from './../../utils/MySentence';
import {Actions} from 'react-native-router-flux';
let pageTitle = '문장 학습';

export default class SentenceStudyInit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: []
        };
    }    

    componentDidMount() {
        this.fetchSentenceList();
    }

    async fetchSentenceList() {
        if(this.props.params.before != 'mysentence') {
            performNetwork(this, getSentenceList(this.props.params.category_id)).then((response) => {
                if(response == null) { return; }
                this.setState({arrData: response});
            });
        }
        else  {
            this.setState({loaded: false});
            let _sen_list = await getSentenceListFromMySentence();
            this.setState({arrData: _sen_list, loaded: true});
        }
    }

    render()  {
        return (
            <Container>
                <UserHeader title={pageTitle} /> 
                <SubHeader title="중1비상 (홍민표) 1과" />
                <FlatList
                    style={[styles.container, styles.scrollView]}
                    data={this.state.arrData}
                    keyExtractor={(item) => item.id}
                    renderItem={ ({item, index}) => (
                        <SentenceStudyItem
                        engSentence={item.sentence}
                        korSentence={item.meaning} totalProblems={this.state.arrData.length} currentNo={index + 1} />
                    )}

                    ListFooterComponent={
                        <>
                        <View style={styles.contentPaddingBottom}></View>   
                        <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                        </>    
                    }
                />
                <View style={{display: 'flex', flexDirection: 'row', paddingVertical: normalize(26), justifyContent: 'space-evenly'}}>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>전체선택</Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>임의대로</Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => Actions.push("sentence_study")}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyMedium]}>학습시작</Text>
                    </Button>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingTop: normalize(6), 
        paddingBottom: normalize(30)
    },
    korStudySen: {
        fontSize: normalize(16),
        lineHeight: normalize(24)
    },
    footerButton: {
        width: normalize(96),
        height: normalize(44),
        borderRadius: normalize(50),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1BA3E5'
    },
    contentPaddingBottom: {
        height: normalize(30)
    }
});