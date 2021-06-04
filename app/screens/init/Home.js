import React from 'react';
import { StyleSheet, View, Text, ImageBackground} from 'react-native';
import Images from './../../assets/Images';
export default class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={Images.backImg} style={styles.image} resizeMode='cover'>
                    <Text>Hi Home dddd</Text>
                </ImageBackground>
            </View>
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
});