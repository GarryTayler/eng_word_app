import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { fonts, normalize } from './../../assets/styles';
export default class ViewHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render()    {
        return (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(8), 
            paddingVertical: normalize(4), height: normalize(32)}}>
                <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                    {
                        !this.props.sentence ?
                        <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                        : null
                    }           
                    <Text style={[fonts.colorRed, fonts.size14, fonts.weightBold, {marginLeft: normalize(4)}]}>{this.props.currentNo}</Text>
                    <Text style={[fonts.size14, fonts.weightBold]}> / {this.props.totalCount}</Text>
                </View>           
                <View style={{flex: 1}}>
                    <Text numberOfLines={1} style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }
}