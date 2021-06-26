import React from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, TouchableHighlight} from 'react-native';
import { Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { fonts, calcButtonListMarginTop } from './../../assets/styles';
import { performNetwork } from './../../components/shared/global';
import { getCategoryList } from './../../utils/api';
export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: true,
            arrData: []
        };
    }

    buttonClick(id, parent_id) {
        alert(id + '=' + parent_id);
    }

    componentDidMount() {
        this.fetchCategoryList();
    }

    fetchCategoryList() {
        performNetwork(this, getCategoryList(0)).then((response) => {
            if (response == null) { return; }
            this.setState({arrData: response});
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.image} resizeMode='cover'>
                        <ScrollView>
                            { /*
                            <View style={{display : 'flex', alignItems: 'center', marginTop: calcButtonListMarginTop(5, 54)}}>
                                <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#FF9636'>
                                    <ImageBackground source={ Images.buttons[0][0] } style={styles.buttonImage} resizeMode='cover'>
                                        <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>초등부</Text>
                                    </ImageBackground>
                                </TouchableHighlight>
                            </View>
                            <View style={{display : 'flex', alignItems: 'center'}}>
                                <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#68ADED'>
                                    <ImageBackground source={ Images.buttons[0][1] } style={styles.buttonImage} resizeMode='cover'>
                                        <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>중등부</Text>
                                    </ImageBackground>
                                </TouchableHighlight>
                            </View>
                            <View style={{display : 'flex', alignItems: 'center'}}>
                                <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#44D24A'>
                                    <ImageBackground source={ Images.buttons[0][2] } style={styles.buttonImage} resizeMode='cover'>
                                        <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>고등부</Text>
                                    </ImageBackground>
                                </TouchableHighlight>
                            </View> */
                            }
                            {
                                this.state.arrData == null || this.state.arrData.length == 0 ? null : 
                                    this.state.arrData.map((item, index) => (
                                        <View style={{display : 'flex', alignItems: 'center', marginTop: (index == 0 ? calcButtonListMarginTop((this.state.arrData.length + 2), 54) : 0)}} key={index}>
                                            <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick(item.id, item.parent_id) } } underlayColor='#44D24A'>
                                                <ImageBackground source={ Images.buttons[0][index % 5] } style={styles.buttonImage} resizeMode='cover'>
                                                    <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>{item.name}</Text>
                                                </ImageBackground>
                                            </TouchableHighlight>
                                        </View>     
                                    ))
                            }
                            <View style={{display : 'flex', alignItems: 'center', marginTop: (this.state.arrData.length == 0 ? calcButtonListMarginTop(2, 54) : 0)}}>
                                <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#A49E9E'>
                                    <ImageBackground source={ Images.buttons[0][this.state.arrData.length % 5] } style={styles.buttonImage} resizeMode='cover'>
                                        <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>사랑영단어</Text>
                                    </ImageBackground>
                                </TouchableHighlight>
                            </View>
                            <View style={{display : 'flex', alignItems: 'center'}}>
                                <TouchableHighlight style={styles.button} activeOpacity={0.8} onPress={ () => { this.buttonClick() } } underlayColor='#4E4E4E'>
                                    <ImageBackground source={ Images.buttons[0][(this.state.arrData.length + 1) % 5] } style={styles.buttonImage} resizeMode='cover'>
                                        <View>
                                            <Text style={[fonts.size22, fonts.weightBold, fonts.colorWhite, styles.buttonLabel]}>최근 학습한 내용</Text>
                                            <Text style={[fonts.size10, fonts.weightBold, fonts.colorWhite, {marginTop: 2, textAlign: 'right'}]}>중1 비상 (홍민표) 3과</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableHighlight>
                            </View>
                        </ScrollView>
                    </ImageBackground>
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
        letterSpacing: 6
    }
});