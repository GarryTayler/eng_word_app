import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
export default class SubHeader extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.subHeader}>
                <Text style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>{ this.props.title }</Text>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subHeader: {
        paddingRight: normalize(8),
        paddingTop: normalize(8),
        paddingBottom: normalize(8),
        borderBottomWidth: 1,
        borderColor: 'black'
    }    
});