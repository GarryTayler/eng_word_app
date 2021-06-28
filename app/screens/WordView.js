import React from 'react';
import { StyleSheet, View, Text , Dimensions} from 'react-native';
import { Container, Content, Button } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import WordSpeech from './../components/shared/WordSpeech';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { performNetwork } from './../components/shared/global';
import { getWordList } from './../utils/api';
import { getWordListFromMyWord } from './../utils/MyWord';

let pageTitle = '단어 보기';
const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

export default class WordView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            curPage: 0
        }; 
    }
    componentDidMount() {
        this.fetchWordList();
    }
    async fetchWordList() {
        if(this.props.params.before != 'myword') {
            performNetwork(this, getWordList(this.props.params.category_id)).then((response) => {
                if(response == null) { return; }
                this.setState({arrData: response});
            });
        }
        else {
            this.setState({loaded: false});
            let _word_list = await getWordListFromMyWord();
            this.setState({arrData: _word_list, loaded: true});
        }
    }
    changeScreen(e) {
        this.setState({curPage: e.index});
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader sentence={this.props.params.before != 'myword' ? false : true} currentNo={this.state.curPage + 1} totalCount={this.state.arrData.length} title="고1 모의고사 2018년 3월 4월 모의고사 진행중" />
                <View style={styles.container}>
                    <SwiperFlatList
                        onChangeIndex={(e)=>{
                                this.changeScreen(e)
                        }}
                        data={this.state.arrData}
                        renderItem={({ item }) => (
                            <View style={[styles.child, { backgroundColor: '#E4E4E4' }]}>
                                <View style={styles.upWordContainer}>
                                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                                        <View style={{marginHorizontal: normalize(10)}}>
                                            <Text numberOfLines={1} style={[fonts.size32, fonts.weightBold]}>{item.word}</Text>
                                        </View>
                                        <View style={{marginHorizontal: normalize(10), position: 'relative', flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={[fonts.weightBold, fonts.size20, {color: 'rgba(0,0,0,0.5)'}]}>[dɪˈveləp]</Text>
                                            {
                                                /* <WordSpeech wordView /> */
                                            }
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={styles.downMeaningContainer}>
                                    <View style={{paddingHorizontal: normalize(16)}}>
                                        <View style={{paddingTop: normalize(16), paddingBottom: normalize(8)}}>
                                            <Text style={[fonts.size18, fonts.weightBold, {textAlign: 'center'}]}>{item.meaning}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.exampleSection}>
                                                An American airline was intent on <Text style={[fonts.colorRed, fonts.weightBold]}>develop</Text> the lake as a tourist destination for fishermen.
                                            </Text>
                                            <Text style={styles.exampleSection}>
                                                한 미국 항공사가 그 호수를 낚시꾼들을 위한 관광지로 <Text style={[fonts.colorRed, fonts.weightBold]}>개발하는</Text> 것에 매우 관심을 보였다.
                                            </Text>
                                        </View>
                                    </View>
                                    {
                                        /*
                                        <View style={{marginBottom: normalize(20)}}>
                                            <Button style={styles.altButton}>
                                                <Text style={[fonts.size16]}>터치하여 단어 뜻 보기</Text>
                                            </Button>
                                        </View>
                                        */
                                    }
                                </View>

                            </View>
                        )}
                    />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#E4E4E4', paddingVertical: normalize(12)}}>
                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size16]}>단어 뜻 가리기 </Text>
                        </Button>

                        <Button style={styles.footerButton}>
                            <Text style={[fonts.size16]}>예문 해석 가리기 </Text>
                        </Button>
                    </View>
                </View>           
            </Container>           
        )
    }   
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    child: { width },
    container: {
        flex: 1,
        backgroundColor: '#E4E4E4',
    },
    upWordContainer: {
        backgroundColor: '#F4F4F4',
        height: normalize(250)
    },
    downMeaningContainer: {
        backgroundColor: '#E4E4E4'
    },
    exampleSection: {
        fontSize: normalize(16),
        lineHeight: normalize(24)
    },
    footerButton: {
        width: normalize(144),
        height: normalize(44),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(12),
        borderColor: '#EB5757',
        borderWidth: 1,
    },
    altButton: {
        width: normalize(209),
        height: normalize(35),
        borderRadius: normalize(4),
        backgroundColor: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    }
});