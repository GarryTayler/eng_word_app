import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight, FlatList} from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { BUTTON_UNDERLAY_COLOR } from './../../utils/constants';
import { fonts, calcButtonListMarginTop, normalize } from './../../assets/styles';
import { performNetwork } from './../../components/shared/global';
import { getCategoryList } from './../../utils/api';
import Spinner_bar from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import { Icon, CheckBox  } from 'react-native-elements';
import { getVocabularyList } from '../../utils/MyMakingWords';

export default class MyMakingWordsHome extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            serverRespond: false,
            arrData: [],
            edit: false,
            checkAll: false
        };
    }

    buttonClick(id = null, has_child = 'Y', name = '') {
        
    }

    async componentDidMount() {
        let list = await getVocabularyList();
        console.log('here', list);
    }

    new_trash() {
        if(this.state.edit) {

        } else {
            Actions.push("create_word")
        }
    }

    edit() {
        this.setState({edit: !this.state.edit})
    }

    setChecked(index) {
        let temp = this.state.arrData;
        temp[index]['checked'] = !temp[index]['checked'];
        this.setState({arrData: temp});
    }

    setCheckAll() {
        let temp = this.state.arrData;
        if(temp && temp.length > 0) {
            temp.map((item, index) => {
                if(this.state.checkAll) {
                    temp[index]['checked'] = false
                } else {
                    temp[index]['checked'] = true
                }
            })
            this.setState({arrData: temp})
        }
        
        this.setState({checkAll: !this.state.checkAll})
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.image} resizeMode='cover'>
                        <View style={{display : 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 21, paddingTop: 20}}>
                            <TouchableHighlight style={[styles.button, {width: 59, height: 74}]} activeOpacity={0.8} onPress={ () => { this.new_trash() } } underlayColor='#4E4E4E'>
                                <ImageBackground source={ Images.buttons[4][0] } imageStyle={{borderRadius: 8}} style={[styles.buttonImage]} resizeMode="cover">
                                    {
                                        this.state.edit ?
                                        <View>
                                            <Icon name='trash-outline' type='ionicon' color={'white'} size={30} />
                                            <Text style={[fonts.size12, fonts.colorWhite, {marginTop: 7}]}>삭제</Text>
                                        </View>
                                        :
                                        <View>
                                            <Icon name='pluscircle' type='antdesign' color={'white'} size={30} />
                                            <Text style={[fonts.size12, fonts.colorWhite, {marginTop: 7}]}>새단어장</Text>
                                        </View>
                                    }
                                    
                                </ImageBackground>
                            </TouchableHighlight>

                            <TouchableHighlight style={[styles.button, {width: 59, height: 74, marginLeft: 10}]} activeOpacity={0.8} onPress={ () => { this.edit() } } underlayColor='#4E4E4E'>
                                <ImageBackground source={ Images.buttons[4][1] } imageStyle={{borderRadius: 8}} style={styles.buttonImage} resizeMode="cover">
                                    {
                                        this.state.edit ?
                                        <View>
                                            <Icon name='exit-outline' type='ionicon' color={'white'} size={30} />
                                            <Text style={[fonts.size12, fonts.colorWhite, {marginTop: 10}]}>편집종료</Text>
                                        </View>
                                        :
                                        <View>
                                            <Icon name='pencil' type='octicon' color={'white'} size={30} />
                                            <Text style={[fonts.size12, fonts.colorWhite, {marginTop: 10}]}>편집하기</Text>
                                        </View>
                                    }
                                </ImageBackground>
                            </TouchableHighlight>
                        </View> 

                        {
                            this.state.edit ?
                            <CheckBox
                                title='전체 선택'
                                checked={this.state.checkAll}
                                containerStyle={{backgroundColor: 'transparent', borderWidth: 0, paddingLeft: 15}}
                                textStyle={{color: 'white'}}
                                uncheckedIcon={<Image source={require('../../assets/img/Unchekced.png')} style={{width: 25, height: 25}} />}
                                checkedIcon={<Image source={require('../../assets/img/CheckBox.png')} style={{width: 25, height: 25}} />}
                                onPress={() => this.setCheckAll()}
                            />
                            :
                            null
                        }
                        <FlatList
                            style={[styles.container, {paddingHorizontal: normalize(10)}]}
                            contentContainerStyle={{justifyContent: 'center'}}
                            data={this.state.arrData}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item, index}) => (
                                <View style={this.state.edit ? {alignItems: 'center', flexDirection: 'row'} : {alignItems: 'center'}}>
                                    {
                                        this.state.edit ?
                                        <CheckBox
                                            checked={item.checked}
                                            containerStyle={{backgroundColor: 'transparent', borderWidth: 0, marginBottom: 19, paddingHorizontal: 0}}
                                            uncheckedIcon={<Image source={require('../../assets/img/Unchekced.png')} style={{width: 25, height: 25}} />}
                                            checkedIcon={<Image source={require('../../assets/img/CheckBox.png')} style={{width: 25, height: 25}} />}
                                            onPress={() => this.setChecked(index)}
                                        />
                                        :
                                        null
                                    }
                                    <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#4E4E4E'>
                                        <ImageBackground source={ Images.buttons[3][index % 4] } style={styles.buttonImage} resizeMode='cover'>
                                            <View>
                                                <Text style={[fonts.size20, fonts.familyBold, fonts.colorWhite, styles.buttonLabel]}>{item.name}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableHighlight>
                                    {
                                        this.state.edit ?
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableHighlight style={styles.editProp}>
                                                <Icon name='pencil' type='octicon' color={'black'} size={20} />
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.editProp}>
                                                <Icon name='trash-outline' type='ionicon' color={'black'} size={20} />
                                            </TouchableHighlight>
                                            <TouchableHighlight style={styles.editProp}>
                                                <Icon name='arrow-up-down' type='material-community' color={'black'} size={20} />
                                            </TouchableHighlight>
                                        </View>
                                        :
                                        null
                                    }
                                    
                                </View> 
                            )}
                            ListFooterComponent={
                                <>
                                <View style={{ height: normalize(40) }}></View>
                                <Spinner_bar color={'#68ADED'} visible={!this.state.loaded} textContent={""}  overlayColor={"rgba(0, 0, 0, 0.5)"}  />
                                </>    
                            }
                            />
                            
                        
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
        flexDirection: "column",
    },
    image: {
        flex: 1
    },
    button: {
        width: 173,
        height: 48,
        borderRadius: 8,
        marginBottom: 19,

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
    },
    editProp: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1.25,
        shadowRadius: 4.84,
        elevation: 8,
        marginBottom: 19,
        marginLeft: 8
    }
});