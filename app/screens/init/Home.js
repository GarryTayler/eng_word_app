import React from 'react';
import { StyleSheet, View, Text, ImageBackground, ScrollView} from 'react-native';
import { Button, Container, Content } from 'native-base';
import Images from './../../assets/Images';
import { fonts } from './../../assets/styles';
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <Content contentContainerStyle={styles.container}>
                    <ImageBackground source={Images.backImg} style={styles.image} resizeMode='cover'>
                        <ScrollView>
                            <Button style={styles.button}>
                                <Text style={[styles.buttonLabel, fonts.colorWhite, fonts.size22]}>초등부</Text>
                            </Button>
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
        flex: 1,
        //resizeMode: "contain"
    },
    button: {
        width: 229.6,
        height: 54,
        borderRadius: 8,
        backgroundColor: '#FF9636',
        marginTop: 30,

        shadowColor: 'rgba(0,0,0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 5,
        shadowRadius: 18,
        elevation: 15,
    },
    buttonLabel: {
    }
});