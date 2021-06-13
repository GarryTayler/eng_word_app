import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'native-base';
import { fonts, normalize } from './../../assets/styles';
export default class StudyResultHistoryDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 8}}>
                    <View>
                        <Text style={[fonts.size14]}>{this.props.id}.</Text>    
                    </View>
                    <View style={{marginLeft: normalize(18)}}>
                        <Text style={[fonts.size14]}>{this.props.time}</Text>
                        <Text style={[fonts.size14, {marginTop: normalize(4)}]}>{this.props.detail}</Text>
                    </View>
                </View>
                <View style={styles.detailView}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={[fonts.size14, fonts.weightBold]}>{this.props.solvedCount}/{this.props.totalCount}</Text>
                        <Text style={[fonts.size16, fonts.weightBold, fonts.colorRed]}>{this.props.mark}점</Text>
                    </View>
                    <View style={{marginLeft: normalize(18)}}>
                        <Button style={styles.removeButton}>
                            <Text style={styles.removeButtonText}>삭제</Text>
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