import React from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { BUTTON_UNDERLAY_COLOR } from './../../utils/constants';
import { fonts, calcButtonListMarginTop } from './../../assets/styles';
import { performNetwork } from './../../components/shared/global';
import { getCategoryList } from './../../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import { addToRecentStudy, getRecentStudy } from './../../utils/RecentStudy';
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            selectedName: this.props.selectedName,
            selectedSubject: null
        };
    }

    async buttonClick(id = null, has_child = 'Y', name = '') {
        if(has_child == 'Y') {
            Actions.push('home', {parent_id: id, selectedName: name});
        }
        else {
            let temp = { category_id: id, title: name, selectedName : this.state.selectedName + " " + name }
            await addToRecentStudy(temp);
            Actions.push('detail', {params: {category_id: id, title: name}});
        }
    }

    recentStudy() {
        if(this.state.selectedSubject)
            Actions.push('detail', {params: {category_id: this.state.selectedSubject.category_id, title: this.state.selectedSubject.title}});
    }

    async componentDidMount() {
        let selectedStudy = await getRecentStudy();
        if(selectedStudy) {
            this.setState({selectedSubject: selectedStudy})
        }
        this.fetchCategoryList();
    }

    fetchCategoryList() {
        performNetwork(this, getCategoryList(this.props.parent_id ?  this.props.parent_id: 0)).then((response) => {
            if (response == null) { return; }
            this.setState({arrData: response});
        });
    }
    renderOtherStep() {
        return (
            this.state.serverRespond ? 
            <ScrollView>
            {
                this.state.arrData == null || this.state.arrData.length == 0 ? null : 
                    this.state.arrData.map((item, index) => (
                        <View style={{display : 'flex', alignItems: 'center', marginTop: (index == 0 ? calcButtonListMarginTop((this.state.arrData.length), 48) : 0)}} key={index}>
                            <TouchableHighlight style={styles.button48} activeOpacity={0.8} onPress={ () => { this.buttonClick(item.id, item.has_child, item.name) } } underlayColor={BUTTON_UNDERLAY_COLOR[1][index % 4]}>
                                <ImageBackground source={ Images.buttons[1][index % 4] } style={styles.buttonImage48} resizeMode='cover'>
                                    <Text numberOfLines={1} style={[fonts.size16, fonts.familyBold, fonts.colorWhite, styles.buttonLabel48]}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableHighlight>
                        </View>     
                    ))
            }
            </ScrollView>
            :
            null
        )
    }
    renderFirstStep() {
        return (
            this.state.serverRespond ? 
            <ScrollView>
            {
                
                this.state.arrData == null || this.state.arrData.length == 0 ? null : 
                    this.state.arrData.map((item, index) => (
                        <View style={{display : 'flex', alignItems: 'center', marginTop: (index == 0 ? calcButtonListMarginTop((this.state.arrData.length + 2), 54) : 0)}} key={index}>
                            <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick(item.id, item.has_child, item.name) } } underlayColor={BUTTON_UNDERLAY_COLOR[0][index % 5]}>
                                <ImageBackground source={ Images.buttons[0][index % 5] } style={styles.buttonImage} resizeMode='cover'>
                                    <Text style={[fonts.size19, fonts.familyBold, fonts.colorWhite, styles.buttonLabel]}>{item.name}</Text>
                                </ImageBackground>
                            </TouchableHighlight>
                        </View>     
                    ))
            }    
                <View style={{display : 'flex', alignItems: 'center', marginTop: (this.state.arrData.length == 0 ? calcButtonListMarginTop(2, 54) : 0)}}>
                    <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#A49E9E'>
                        <ImageBackground source={ Images.buttons[0][this.state.arrData.length % 5] } style={styles.buttonImage} resizeMode='cover'>
                            <Text style={[fonts.size19, fonts.familyBold, fonts.colorWhite, styles.buttonLabel ]}>
                                사랑영단어
                            </Text>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>
                <View style={{display : 'flex', alignItems: 'center'}}>
                    <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.recentStudy() } } underlayColor='#4E4E4E'>
                        <ImageBackground source={ Images.buttons[0][(this.state.arrData.length + 1) % 5] } style={styles.buttonImage} resizeMode='cover'>
                            <View>
                                <Text style={[fonts.size18, fonts.familyBold, fonts.colorWhite, styles.buttonLabel, {textAlign: 'center'}]}>최근 학습한 내용</Text>
                                {
                                    this.state.selectedSubject ?
                                    <Text style={[fonts.size10, fonts.familyBold, fonts.colorWhite, {marginTop: 2, textAlign: 'right'}]}>{this.state.selectedSubject.selectedName}</Text>
                                    :
                                    null
                                }
                                
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View> 
            </ScrollView>
            : null
        )
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.image} resizeMode="stretch">
                    {   
                        this.props.parent_id ? this.renderOtherStep() : this.renderFirstStep()
                    }
                    </ImageBackground>
                    <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1
    },
    button: {
        width: 230,
        height: 54,
        borderRadius: 8,
        marginBottom: 32,

        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    buttonImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        letterSpacing: 0
    },

    button48: {
        width: 230,
        height: 48,
        borderRadius: 8,
        marginBottom: 32,

        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,
    },
    buttonImage48: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 14
    }, 
    buttonLabel48: {
        letterSpacing: 1,
        textAlign: 'center'
    }
});