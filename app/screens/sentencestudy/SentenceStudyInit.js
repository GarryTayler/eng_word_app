import React from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Button } from 'native-base';
import UserHeader from './../../components/shared/UserHeader';
import SubHeader from './../../components/shared/SubHeader';
import SentenceStudyItem from './../../components/sentencestudy/SentenceStudyItem';

let pageTitle = '문장 학습';

export default class SentenceStudyInit extends React.Component {
    constructor(props){
        super(props);
    }    
    render()  {
        return (
            <Container>
                <UserHeader title={pageTitle} /> 
                <SubHeader title="중1비상 (홍민표) 1과" />
                <Content style={styles.container}>                    
                    <View style={styles.scrollView}>
                        <SentenceStudyItem
                        engSentence="Jinho invited me to his magic show the other day the other day."
                        korSentence="진호가 며칠전에 그의 마술쇼에 나를 초청했다 나를 초청했다." totalProblems="25" currentNo="1" />
                        <SentenceStudyItem
                        engSentence="I don't want to tell my dreams. I want to show every thing."
                        korSentence="저는 제 꿈을 말하고 싶지 않아요. 모든 걸 보여드리고 싶네요." totalProblems="25" currentNo="2" />
                        <SentenceStudyItem
                        engSentence="My pain may be the reason for somebody's laugh."
                        korSentence="제 고통이 누군가의 웃음의 이유일 수도 있는걸요." totalProblems="25" currentNo="3" />
                        <SentenceStudyItem
                        engSentence="It takes 30 seconds to type a text message for her laugh."
                        korSentence="몇 시간 동안 그녀를 미소 짓게 할 문자메시지는 30초 이다." totalProblems="25" currentNo="4" />
                        <SentenceStudyItem
                        engSentence="If you can make a woman laugh , you can do every thing."
                        korSentence="여자를 웃게 할 수 있다면, 어떤 일이든 여자의 여자의" totalProblems="25" currentNo="5" />
                        <SentenceStudyItem
                        engSentence="Don't make decisions when you are angry, angry angry."
                        korSentence="화가 났을때 결정을 내리지 마세요. 행복할 행복할 행복할" totalProblems="25" currentNo="6" />
                        <SentenceStudyItem
                        engSentence="All stars are shining by burning themselves themselves"
                        korSentence="왜 별이 빛났는지 아세요? 왜냐면 그들은 그들은 그들은" totalProblems="25" currentNo="7" />
                        <SentenceStudyItem
                        engSentence="It takes 30 seconds to type a text message for her laugh."
                        korSentence="몇 시간 동안 그녀를 미소 짓게 할 문자메시지는 30초 이다." totalProblems="25" currentNo="8" />
                    </View>
                </Content>
                <View style={{display: 'flex', flexDirection: 'row', paddingVertical: normalize(26), justifyContent: 'space-evenly'}}>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size16, fonts.colorWhite]}>전체선택</Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size16, fonts.colorWhite]}>임의대로</Text>
                    </Button>
                    <Button style={styles.footerButton}>
                        <Text style={[fonts.size16, fonts.colorWhite]}>학습시작</Text>
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