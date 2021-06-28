import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Container, Button, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import ViewHeader from './../components/shared/ViewHeader';
import SentenceViewItem from './../components/shared/SentenceViewItem';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';
import { performNetwork } from './../components/shared/global';
import { getSentenceList } from './../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';

let pageTitle = '문장 보기';

export default class SentenceView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: []
        };
    }

    componentDidMount() {
        this.fetchSentenceList();
    }

    fetchSentenceList() {
        performNetwork(this, getSentenceList(this.props.params.category_id)).then((response) => {
            if(response == null) { return; }
            this.setState({arrData: response});
        });
    }

    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <ViewHeader currentNo={5} totalCount={this.state.arrData.length} title="초등1교과서 비상 (홍민표1) 21과" sentence />

                <View style={{paddingHorizontal: normalize(16), paddingTop: normalize(28), paddingBottom: normalize(12)}}>
                    <View style={{display: 'flex', flexDirection: 'row', position: 'relative'}}>
                        <View style={{position: 'absolute', paddingTop: normalize(3)}}>
                            <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                        </View>
                        <Text style={styles.sentenceSection}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전체 별표
                        </Text> 
                    </View>
                </View>
                {
                    <FlatList
                        style={[styles.container, {paddingHorizontal: normalize(16)}]}
                        data={this.state.arrData}
                        keyExtractor={(item) => item.id}
                        renderItem={ ({item, index}) => (
                            <SentenceViewItem currentNo={index + 1} 
                            english={item.sentence}
                            korean={item.meaning} />
                        )}
                        ListFooterComponent={
                            <>
                            <View style={{ height: normalize(40) }}></View>
                            <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                            </>    
                        }
                    />
                }

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