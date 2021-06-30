import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { normalize } from './../../assets/styles';
import UserHeader from './../../components/shared/UserHeader';
import SubHeader from './../../components/shared/SubHeader';
import MyWordListItem from './../../components/myword/MyWordListItem';
import { getWordListFromMyWord } from './../../utils/MyWord';
import Spinner_bar from 'react-native-loading-spinner-overlay';

let pageTitle = '단어목록보기';

export default class MyWordListView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allChecked: false,
            arrData: [],
            wordShow: true,
            meaningShow: true,
            loaded: true,
            checkedIdList: []
        }
    }
    async componentDidMount() {
        this.setState({loaded: false});
        let _word_list = await getWordListFromMyWord();
        this.setState({arrData: _word_list, loaded: true});
    }
    onChangeMeaning(e)  {
        this.setState({meaningShow: e});
    }
    onChangeWord(e) {
        this.setState({wordShow: e});
    }
    clickAllChecked(e) {
        if(e == true)
        {
            let _word_id_list = [];
            for(let i = 0; i < this.state.arrData.length; i ++)
                _word_id_list.push(this.state.arrData[i]['id']);
            this.setState({checkedIdList: _word_id_list, allChecked: true});
        }
        else {
            this.setState({checkedIdList: [], allChecked: false});
        }
    }
    render()  {
        return (
            <Container>
                <UserHeader title={pageTitle} wordList favorite
                triggerMeaning={(e) => { this.onChangeMeaning(e) }}
                triggerWord={(e) => { this.onChangeWord(e) }} />
                <SubHeader title="중1비상 (홍민표) 1과" favorite
                onPress={(e) => { this.clickAllChecked(e) }} />
                <FlatList
                    data={this.state.arrData}
                    keyExtractor={(item) => item.id}
                    renderItem={ ({ item, index }) => (
                        <MyWordListItem
                            numberOfWords={this.state.arrData.length}
                            currentNo={index + 1}
                            word={item.word}
                            meaning={item.meaning}
                            wordShow={this.state.wordShow}
                            meaningShow={this.state.meaningShow}
                            allChecked={this.state.allChecked}
                        />
                    )}
                />
                <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
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
