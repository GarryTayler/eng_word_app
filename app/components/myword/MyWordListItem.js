import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import CheckBox from 'react-native-check-box';
import { Icon } from 'react-native-elements';

export default class MyWordListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: false
        }
    }
    doSwap() {
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{position: 'absolute', top: normalize(4), left: normalize(12)}}>
                    <Text style={[fonts.size11]}>1/156</Text>
                </View>
                <View style={[styles.flexRowAlign]}>
                    <View style={[styles.flexRowAlign, {flex: 5}]}>
                        <CheckBox
                            onClick={()=>{
                                this.setState({
                                    isChecked:!this.state.isChecked
                                })
                            }}
                            isChecked={this.state.isChecked}
                            style={styles.checkBoxItem}
                        />
                        <View style={{flexShrink: 1}}>
                            <TouchableHighlight
                        onPress={ () => { this.setState({
                                            isChecked:!this.state.isChecked
                                        }) } } activeOpacity={0.6} underlayColor='white'>
                                <Text style={[fonts.size16, fonts.weightBold, {marginLeft: normalize(10)}]} numberOfLines={1}>
                                    {this.props.word}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex:5, display: 'flex', flexDirection: 'row', paddingLeft: normalize(4) }}>
                        <Text numberOfLines={2} style={[fonts.size14, fonts.weightBold]}>
                            {this.props.meaning}
                        </Text>
                    </View>
                    <View style={{ flex:2, alignItems: 'flex-end' }}>
                        <TouchableHighlight style={styles.swapIconContainer}
                        onPress={ () => {this.doSwap()} } underlayColor="white" activeOpacity={0.8}>
                            <Icon name='arrow-swap' type='fontisto' color='rgba(0,0,0,0.5)'
                            style={styles.swapIcon} size={14} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>    
        );
    }   
}

const styles = StyleSheet.create({
    swapIcon: {
        transform: [{ rotate: '90deg'}]
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
    },
    container: {
        paddingRight: normalize(12), paddingLeft: normalize(12),
        height: normalize(64),
        borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center', flexDirection: 'row',
        position: 'relative'
    },
    flexRowAlign: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});