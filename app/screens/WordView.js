import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Container, Content, Button } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import WordSpeech from './../components/shared/WordSpeech';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';

let pageTitle = '단어 보기';

export default class WordView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                
                    <View style={styles.upWordContainer}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(8), paddingVertical: normalize(4)}}>
                            <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                <Text style={[fonts.colorRed, fonts.size14, fonts.weightBold, {marginLeft: normalize(4)}]}>11</Text>
                                <Text style={[fonts.size14, fonts.weightBold]}> / 156</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>
                                    고1 모의고사 2018년 3월 4월 모의고사 진행중
                                </Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                            <Text style={[fonts.size32, fonts.weightBold]}>develop</Text>
                            <Text style={[fonts.weightBold, fonts.size20, {color: 'rgba(0,0,0,0.5)'}]}>[dɪˈveləp]</Text>
                            <WordSpeech wordView />
                        </View>
                    </View>

                    <View style={styles.downMeaningContainer}>
                        <View>
                            <Text style={[fonts.size18, fonts.weightBold]}>개발하다, 발전하다, 인화하다</Text>
                            <Text style={styles.exampleSection}>
                                An American airline was intent on develop the lake as a tourist destination for fishermen.
                            </Text>
                            <Text style={styles.exampleSection}>
                                한 미국 항공사가 그 호수를 낚시꾼들을 위한 관광지로 개발하는 것에 매우 관심을 보였다.
                            </Text>
                        </View>
                        <View style={{marginBottom: normalize(20)}}>
                            <Button style={styles.altButton}>
                                <Text style={[fonts.size16]}>터치하여 단어 뜻 보기</Text>
                            </Button>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: normalize(20)}}>
                            <Button style={styles.footerButton}>
                                <Text style={[fonts.size16]}>단어 뜻 가리기 </Text>
                            </Button>

                            <Button style={styles.footerButton}>
                                <Text style={[fonts.size16]}>예문 해석 가리기 </Text>
                            </Button>
                        </View>
                    </View>

                </Content>              
            </Container>           
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E4E4',
    },
    upWordContainer: {
        backgroundColor: '#F4F4F4',
        height: normalize(309)
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