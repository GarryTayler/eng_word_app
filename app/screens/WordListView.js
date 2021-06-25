import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import SubHeader from './../components/shared/SubHeader';
import WordListItem from './../components/shared/WordListItem';
import { normalize } from './../assets/styles';

let pageTitle = '단어목록보기';

export default class WordListView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <SubHeader title="중1 비상 (홍민표) 12과" />
                <Content style={styles.container}>    
                    <WordListItem 
                        currentNo={1} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={2} 
                        totalCount={156}
                        word="develop"
                        meaning="전진하는, 개발" />
                    <WordListItem 
                        currentNo={3} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={4} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={5} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={6} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={7} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={8} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={9} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={10} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <WordListItem 
                        currentNo={11} 
                        totalCount={156}
                        word="develop"
                        meaning="앉아있는, 정지한" />
                    <View style={{height: normalize(120)}}></View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});