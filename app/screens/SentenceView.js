import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Container, Button, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import SentenceViewItem from './../components/shared/SentenceViewItem';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';
import { performNetwork } from './../components/shared/global';
import { getSentenceList } from './../utils/api';
import { getSentenceListFromMySentence, getSentenceIdListFromMySentence } from './../utils/MySentence';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import Orientation from 'react-native-orientation';
import { getRecentStudy } from './../utils/RecentStudy';
let pageTitle = '문장 보기';

export default class SentenceView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            mysentenceidList: [],
            curIndex: 0,
            selectedSubject: null
        };
    }

    async componentDidMount() {
        Orientation.lockToPortrait();
        let selectedStudy = await getRecentStudy();
        if(selectedStudy) {
            this.setState({selectedSubject: selectedStudy})
        }
        this.fetchSentenceList();
    }

    async fetchSentenceList() {
        if(this.props.params.before != 'mysentence') {
            performNetwork(this, getSentenceList(this.props.params.category_id)).then((response) => {
                if(response == null) { return; }
                this.setState({arrData: response});
            });
        }
        else {
            this.setState({loaded: false});
            let _sen_list = await getSentenceListFromMySentence();
            this.setState({arrData: _sen_list, loaded: true});
        }
        let _id_list = await getSentenceIdListFromMySentence();
        this.setState({mysentenceidList: _id_list});
    }

    studySetence() {
        let temp = [this.state.arrData[this.state.curIndex]]
        Actions.push("sentence_study", {sentenceList: temp})
    }

    studyAllSetence() {
        Actions.push("sentence_study", {sentenceList: this.state.arrData})
    }

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader currentNo={this.state.curIndex + 1} totalCount={this.state.arrData.length} title={this.state.selectedSubject ? this.state.selectedSubject.selectedName : ''} ellipsis={true} sentence />
                <View style={{paddingHorizontal: normalize(16), paddingTop: normalize(28), paddingBottom: normalize(12)}}>
                {
                    this.props.params.before=='detail' ?
                    <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                        <View style={{position: 'absolute', paddingTop: normalize(3)}}>
                            <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                        </View>
                        <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 별표
                        </Text> 
                    </View>
                    : 
                    null
                }
                </View>
                {
                    <FlatList
                        style={[styles.container, {paddingHorizontal: normalize(16)}]}
                        data={this.state.arrData}
                        keyExtractor={(item) => item.id}
                        renderItem={ ({item, index}) => (
                            <SentenceViewItem currentNo={index + 1} 
                            english={item.sentence}
                            korean={item.meaning}
                            param={item}
                            star={this.state.mysentenceidList.indexOf(item.id) >= 0 ? true : false}
                            starShow={this.props.params.before=='detail'?true:false}
                             />
                        )}
                        ListFooterComponent={
                            <>
                            <View style={{ height: normalize(40) }}></View>
                            <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                            </>    
                        }
                    />
                }

                <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', 
                            justifyContent: 'center',
                            paddingTop: normalize(12), paddingBottom: normalize(4)}}>
                    <Button style={styles.footerButton}
                    onPress={() => {this.hideWord()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            단어가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}
                    onPress={() => {this.hideSentence()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            문장가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}
                    onPress={() => {this.hideMeaning()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            해석가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => this.studySetence()}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            현재문장학습
                        </Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => this.studyAllSetence()}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            전체문장학습
                        </Text>
                    </Button>
                </View>
            </Container>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    footerButton: {
        width: normalize(104),
        height: normalize(44),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#1BA3E5',
        borderRadius: normalize(27),
        marginBottom: normalize(8),
        marginHorizontal: normalize(2)
    },
    sentenceSection: {
        fontSize: normalize(15),
        lineHeight: normalize(30)
    }
})