import React from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, Text, FlatList, TextComponent, Alert } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import SubHeader from './../../components/shared/SubHeader';
import SentenceStudyItem from './../../components/sentencestudy/SentenceStudyItem';
import {performNetwork} from './../../components/shared/global';
import {getSentenceList} from './../../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {getSentenceListFromMySentence, getSentenceIdListFromMySentence} from './../../utils/MySentence';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation';
let pageTitle = '문장 학습';
let originalData = [];
export default class SentenceStudyInit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            order: true,
            checkAll: false,
            org_data: null,
        };
    }    

    componentDidMount() {
        Orientation.lockToPortrait();
        Orientation.unlockAllOrientations();
        this.fetchSentenceList();
    }

    UNSAFE_componentWillReceiveProps() {
        Orientation.lockToPortrait();
        Orientation.unlockAllOrientations();
    }

    async fetchSentenceList() {
        if(this.props.params.before != 'mysentence') {
            performNetwork(this, getSentenceList(this.props.params.category_id)).then(async (response) => {
                if(response == null) { return; }
                if(response && response.length > 0) {
                    let temp = [];
                    let idList = await getSentenceIdListFromMySentence();

                    response.map((item, index) => {
                        item['checked'] = false
                        item['isFavorite'] = false
                        if(idList && idList.length > 0) {
                            idList.map((_item) => {
                                if(item.id == _item) {
                                    item['isFavorite'] = true
                                }
                            })
                        }
                        temp.push(item);
                    })
                    this.setState({arrData: temp});
                    await AsyncStorage.setItem("sentence_study", JSON.stringify(temp));
                }
                
            });
        }
        else  {
            this.setState({loaded: false});
            let _sen_list = await getSentenceListFromMySentence();
            this.setState({arrData: _sen_list, loaded: true});
        }
    }

    selectAll() {
        let temp = this.state.arrData;
        if(temp && temp.length > 0) {
            temp.map((item, index) => {
                if(this.state.checkAll)
                    temp[index]['checked'] = false;
                else
                    temp[index]['checked'] = true;
            })
            this.setState({arrData: temp});
            this.setState({checkAll: !this.state.checkAll})
        }
    }

    startStudy() {
        let temp = this.state.arrData;
        if(temp && temp.length > 0) {
            let sentenceList = [];
            temp.map((item, index) => {
                if(item.checked) {
                    sentenceList.push(item);
                }
            })
            if(sentenceList.length > 0) 
                Actions.push("sentence_study", {sentenceList: sentenceList})
            else
                Alert.alert("문장을 선택해주세요");
        }
        
    }

    checkClick(checked, index) {
        let temp = this.state.arrData
        temp[index]['checked'] = checked;
        this.setState({arrData: temp})
        let allChecked = true;
        temp.map((item, index) => {
            if(!item.checked)
                allChecked = false
        })
        this.setState({checkAll: allChecked})
    }

    renderSentence(item ,index) {
        return <SentenceStudyItem
        key={item.id}
        engSentence={item.sentence}
        isFavorite={item.isFavorite}
        korSentence={item.meaning} checked={item.checked} totalProblems={this.state.arrData.length} currentNo={index + 1} 
        checkClick={(checked) => this.checkClick(checked, index)}
        />
    }

    async changeOrder() {
        if(this.state.order) {
            let temp = this.state.arrData
            this.setState({arrData: this.shuffle(temp)})
        } else {
            this.setState({loaded: false})
            let temp = await AsyncStorage.getItem("sentence_study");
            if(temp)
                this.setState({arrData: JSON.parse(temp)})
            this.setState({loaded: true})
        }
        this.setState({order: !this.state.order})
    }

    shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    render() {
        
        return (
            <Container>
                <UserHeader title={pageTitle} /> 
                <SubHeader title="중1비상 (홍민표) 1과" />
                <FlatList
                    style={[styles.container, styles.scrollView]}
                    data={this.state.arrData}
                    keyExtractor={(item) => item.id}
                    renderItem={ ({item, index}) => (
                        this.renderSentence(item, index)
                    )}

                    ListFooterComponent={
                        <>
                        <View style={styles.contentPaddingBottom}></View>   
                        <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                        </>    
                    }
                />
                <View style={{display: 'flex', flexDirection: 'row', paddingVertical: normalize(26), justifyContent: 'space-evenly'}}>
                    <Button style={styles.footerButton} onPress={() => this.selectAll()}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyBold]}>{ this.state.checkAll ? '선택해제' : '전체선택'}</Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => this.changeOrder()}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyBold]}>{ this.state.order ? '임의대로' : '순서대로'}</Text>
                    </Button>
                    <Button style={styles.footerButton} onPress={() => this.startStudy()}>
                        <Text style={[fonts.size16, fonts.colorWhite, fonts.familyBold]}>학습시작</Text>
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