import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { fonts, normalize } from './../../assets/styles';
export default class WordStudyHeader extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View>
                <View style={{backgroundColor: '#68ADED', paddingVertical: normalize(8)}}>                
                    <Text style={[fonts.size18, fonts.familyBold, fonts.colorWhite,fonts.familyRegular,
                                {textAlign: 'center'}]}>{this.props.title}</Text>
                </View>               
                <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', padding: normalize(8),
                        backgroundColor: 'white'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1}}>
                        <Text style={[fonts.size14, fonts.colorRed, fonts.familyBold]}>{this.props.currentNo}</Text>
                        <Text style={[fonts.size14, fonts.familyBold]}> / {this.props.totalProblems}</Text>
                        <Icon type='evilicon' name='clock' color="#000" size={30} style={{marginHorizontal: normalize(12)}} />
                        <Text style={[fonts.size14, fonts.familyBold]}>00:03</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={[fonts.size14, fonts.familyBold, {color: 'rgba(0, 0, 0, 0.6)'}]}>
                            정답 : { this.props.rightAnswer }
                        </Text>
                        <Text style={[fonts.size14, fonts.familyBold, {color: 'rgba(0, 0, 0, 0.6)', marginLeft: normalize(12)}]}>
                            오답 : { this.props.wrongAnswer }
                        </Text>
                    </View>
                </View>
            </View>
        )   
    }
}