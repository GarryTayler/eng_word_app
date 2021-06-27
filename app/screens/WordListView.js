import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import SubHeader from './../components/shared/SubHeader';
import WordListItem from './../components/shared/WordListItem';
import { normalize } from './../assets/styles';
import { getWordList } from './../utils/api';
import { performNetwork } from './../components/shared/global';
import Spinner_bar from 'react-native-loading-spinner-overlay';
let pageTitle = '단어목록보기';

export default class WordListView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: []
        };        
    }
    componentDidMount() {
        this.fetchWordList();
    }

    fetchWordList() {
        performNetwork(this, getWordList(15)).then((response) => {
            if(response == null) { return; }
            this.setState({arrData: response});
        });
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <SubHeader title="중1 비상 (홍민표) 12과" />
                <FlatList
                    style={styles.container}
                    data={this.state.arrData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <WordListItem 
                        currentNo={index + 1} 
                        totalCount={this.state.arrData.length}
                        word={item.word}
                        meaning={item.meaning} />            
                )}
                    ListFooterComponent={
                        <>
                        <View style={{height: normalize(120)}}></View>
                        <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                        </>
                    }
                />
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