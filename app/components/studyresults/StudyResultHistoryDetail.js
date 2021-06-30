import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { fonts, normalize } from './../../assets/styles';
import {Actions} from 'react-native-router-flux';
export default class StudyResultHistoryDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    detailPage() {
        Actions.push('study_results_detail');
    }

    render() {
        return (
            <View style={styles.container}
            onPress={ () => { this.detailPage() } }>
                 <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 8}}>
                    <View>
                        <Text style={[fonts.size14, fonts.familyRegular]}>{this.props.id}.</Text>    
                    </View>
                    <View style={{marginLeft: normalize(18)}}>
                        <Text style={[fonts.size14, fonts.familyRegular]}>{this.props.time}</Text>
                        <Text style={[fonts.size14, fonts.familyRegular, {marginTop: normalize(4)}]}>{this.props.detail}</Text>
                    </View>
                </View>
                <View style={styles.detailView}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={[fonts.size14, fonts.familyBold]}>{this.props.solvedCount}/{this.props.totalCount}</Text>
                        <Text style={[fonts.size16, fonts.familyBold, fonts.colorRed]}>{this.props.mark}점</Text>
                    </View>
                    <View style={{marginLeft: normalize(18)}}>
                        <Button style={styles.removeButton}>
                            <Text style={[fonts.size14, fonts.familyBold, fonts.colorWhite]}>삭제</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(12),
        paddingVertical: normalize(12),
        borderBottomWidth: 1,
        borderColor: '#D2D2D2'
    },
    detailView: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', flex: 4,
        justifyContent: 'flex-end'
    },
    removeButton: {
        backgroundColor: '#1BA3E5',
        width: normalize(48),
        height: normalize(39),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(4)
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});
