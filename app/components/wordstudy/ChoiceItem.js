import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
export default class ChoiceItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.choiceItem}>
                <View style={{flex: 2}}>
                    <View style={{width: 24, height: 24, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[fonts.size14]}>{this.props.index}</Text>
                    </View>
                </View>
                <View style={{flex: 10}}>
                    <Text style={[fonts.size16, fonts.weightBold]} numberOfLines={1}>
                        {this.props.choice}
                    </Text>
                </View>
            </View>
        )
    }   
}
const styles = StyleSheet.create({
    choiceItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: normalize(44),
        paddingHorizontal: normalize(20),
        marginBottom: normalize(12),
        borderRadius: normalize(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,     
    }
});