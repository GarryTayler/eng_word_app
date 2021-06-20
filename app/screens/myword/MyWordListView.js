import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { normalize } from './../../assets/styles';
import UserHeader from './../../components/shared/UserHeader';
import SubHeader from './../../components/shared/SubHeader';
import MyWordListItem from './../../components/myword/MyWordListItem';

let pageTitle = '단어 목록 보기';

export default class MyWordListView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: false
        }
    }
    render()  {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <SubHeader title="중1비상 (홍민표) 1과" />
                <Content>
                    <MyWordListItem numberOfWords={156} currentNo={1} word="developvelopvelopvelop" meaning="개발하다, 발전하다 (사진을) 현상하다.진을) 현상하다." />
                    <MyWordListItem numberOfWords={156} currentNo={2} word="descent" meaning="하강하다, 강하하다" />
                    <MyWordListItem numberOfWords={156} currentNo={3} word="mean" meaning="의미하다. 평균" />
                    <MyWordListItem numberOfWords={156} currentNo={4} word="develop" meaning="개발하다, 발전하다" />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    swapIcon: {
        transform: [{ rotate: '90deg' }]
    },
    swapIconContainer: {
        width: normalize(24), height: normalize(24),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(24),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 4
    }
});
