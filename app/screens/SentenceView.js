import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import SentenceViewItem from './../components/shared/SentenceViewItem';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';

let pageTitle = '문장 보기';

export default class SentenceView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader currentNo={5} totalCount={138} title="초등1교과서 비상 (홍민표1) 21과" sentence />

                <View style={{paddingHorizontal: normalize(16), paddingTop: normalize(28), paddingBottom: normalize(12)}}>
                    <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                        <View style={{position: 'absolute', paddingTop: normalize(3)}}>
                            <Icon name='star' type='antdesign' color='#F2C94C' />
                        </View>
                        <Text style={styles.sentenceSection}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 별표
                        </Text> 
                    </View>
                </View>
                <Content style={styles.container}>
                    <View style={{paddingHorizontal: normalize(16)}}>
                        <SentenceViewItem currentNo={1} 
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <SentenceViewItem currentNo={2}
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <SentenceViewItem currentNo={3}
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <SentenceViewItem currentNo={4}
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <SentenceViewItem currentNo={5}
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <SentenceViewItem currentNo={6}
                        english="You probaby like to post selfies on social media, but how much do you know about
                        selfies?"
                        korean="당신은 아마 소셜 미디어에 셀피를 게시하는 것을 좋아할지도 모르지만, 셀피에 대해 얼마나 알고 있는가?" />
                        <View style={{ height: normalize(40) }}>
                        </View>
                    </View>


                </Content>
                <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', 
                            justifyContent: 'center',
                            paddingTop: normalize(12), paddingBottom: normalize(4)}}>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.weightBold]}>
                            단어가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.weightBold]}>
                            문장가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.weightBold]}>
                            해석가리기
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.weightBold]}>
                            현재문장학습
                        </Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size14, fonts.colorWhite, fonts.weightBold]}>
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