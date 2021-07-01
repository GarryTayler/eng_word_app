import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
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

let pageTitle = '문장 보기';

export default class SentenceView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            mysentenceidList: [],
            wordShow: true,
            sentenceShow: true,
            meaningShow: true
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
        else {
            this.setState({loaded: false});
            let _sen_list = await getSentenceListFromMySentence();
            this.setState({arrData: _sen_list, loaded: true});
        }
        let _id_list = await getSentenceIdListFromMySentence();
        this.setState({mysentenceidList: _id_list});
    }

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader currentNo={1} totalCount={this.state.arrData.length} title="초등1교과서 비상 (홍민표1) 21과" sentence />

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
                <Content style={[styles.container, {paddingHorizontal: normalize(16), position: 'relative'}]}>

                    {
                        this.state.wordShow ?
                        <>
                        <View style={{position: 'absolute', top: 85, left: 106}}><Text style={[fonts.familyBold, {color: '#68ADED'}]}>아마</Text></View>
                        <View style={{position: 'absolute', top: 85, left: 186}}><Text style={[fonts.familyBold, {color: '#68ADED'}]}>게시하다</Text></View>
                        <View style={{position: 'absolute', top: 115, left: 129}}><Text style={[fonts.familyBold, {color: '#68ADED'}]}>얼마나</Text></View>
                        <View style={{position: 'absolute', top: 272, left: 165}}><Text style={[fonts.familyBold, {color: '#68ADED'}]}>재미있는</Text></View>        
                        </>
                        : null
                    }

                    <View style={{marginBottom: normalize(6)}}> 
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. are you interested in selfies?
                            </Text> 
                        </View>
                        <View>
                                {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                        당신은 셀피에 관심이 있는가?
                                    </Text>
                                    : null
                                }
                            
                        </View>
                    </View>

                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. you probably like to post selfies on social media but how much do you know about selfies.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                    당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?
                                    </Text>
                                    : null
                        }
                        </View>
                    </View>

                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. here are some interesting facts.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                    여기 몇 가지 재미있는 사실들이 있다.
                                    </Text>
                                    : null
                        }
                            
                        </View>
                    </View>

                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. Robert Cornelius took the world's first selfie in 1839.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                        로버트 코닐리어스가 1839년에 세계 최초의 셀피를 찍었다.
                                    </Text>
                                    : null
                        }
                        </View>
                    </View>

                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. selfie became a new word in the dictionary in 2013.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                    selfie는 2013년에 신조어로 사전에 실렸다.
                                    </Text>
                                    : null
                        }
                            
                        </View>
                    </View>

                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6. Buzz Aldrin took the first space selfie in 1966.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                            버즈 올드린이 1966년에 최초의 우주 셀피를 찍었다.
                            </Text>
                                    : null
                        }
                            
                        </View>
                    </View>


                    <View style={{marginBottom: normalize(6)}}>
                        <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                            <TouchableOpacity activeOpacity={0.6} style={{position: 'absolute', paddingTop: normalize(3),
                        zIndex: 10000}}
                        onPress={ () => { this.addToFavorite() } }>
                                <Icon name='star' type='antdesign' color={this.state.isFavorite ? '#F2C94C' : 'rgba(0,0,0,0.2)'} />
                            </TouchableOpacity>
                            <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7. They can stay in the sample place in the air for a long time.
                            </Text> 
                        </View>
                        <View>
                        {
                                    this.state.meaningShow ? 
                                    <Text style={[styles.sentenceSection, fonts.familyRegular]}>
                                        그들은 오랫동안 한곳에 머물며 날수 있다.
                                    </Text>
                                    : null
                        }
                        </View>
                    </View>
                </Content>
                {
                    /*
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
                    /> */
                }

                <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', 
                            justifyContent: 'center',
                            paddingTop: normalize(12), paddingBottom: normalize(4)}}>
                    <Button style={styles.footerButton}
                        onPress={() => {this.wordHide()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            단어가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}
                        onPress={() => {this.sentenceHide()}}>
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
                    <Button style={styles.footerButton}
                        onPress={() => {this.studySentence()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            현재문장학습
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}
                        onPress={() => {this.studyAllSentence()}}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.familyBold]}>
                            전체문장학습
                        </Text>
                    </Button>
                </View>
            </Container>
        );
    }   

    wordHide() {
        this.setState({wordShow: !this.state.wordShow});
    }

    sentenceHide() {
        this.setState({sentenceShow: !this.state.sentenceShow, wordShow: false});
    }

    hideMeaning() {
        this.setState({meaningShow: !this.state.meaningShow, wordShow: false});
    }

    studySentence() {
    }

    studyAllSentence()  {
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