import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import CheckBox from 'react-native-check-box';
export default class SubHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allChecked: false
        }
    }

    render() {
        return (
            <View style={styles.subHeader}>
                <View style={{flex: 1}}>
                    {
                        this.props.favorite ? 
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <CheckBox
                                    onClick={()=>{
                                        this.setState({
                                            allChecked:!this.state.allChecked
                                        })
                                    }}
                                    isChecked={this.state.allChecked}
                            />
                            <TouchableHighlight activeOpacity={0.6} underlayColor='white'
                        onPress={ () => { this.setState({
                                            allChecked:!this.state.allChecked
                                        }) } }>
                                <Text style={[fonts.size14, fonts.weightBold, {marginLeft: normalize(8)}]}>전체선택</Text>
                            </TouchableHighlight>
                        </View>
                        : null
                    }
                </View>
                <View style={{flex: 1}}>
                    <Text style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>{ this.props.title }</Text>    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    subHeader: {
        paddingLeft: normalize(8),
        paddingRight: normalize(8),
        paddingTop: normalize(8),
        paddingBottom: normalize(8),
        borderBottomWidth: 1,
        borderColor: 'black',
        display: 'flex', flexDirection: 'row',
        alignItems: 'center'
    }    
});