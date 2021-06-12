import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Container, Content } from 'native-base';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
export default class StudyResultsHome extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: normalize(12)}}>
                        <View style={{flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <View style={styles.totalProblems}>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorWhite]}>총문제</Text>
                            </View>
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(12)}]}>5 문제</Text>
                            </View>
                        </View>
                        <View style={{flex:1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Icon type='evilicon' name='clock' color="#006DFF" size={30} />
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(12)}]}>시간</Text>
                            </View>
                            <View>
                                <Text style={[fonts.size16, fonts.weightBold, fonts.colorBlue, {marginLeft: normalize(16)}]}>00:18</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBEAFE',
    },
    totalProblems: {
        backgroundColor: '#006DFF',
        paddingVertical: normalize(7),
        paddingHorizontal: normalize(21),
        borderTopRightRadius: normalize(50),
        borderBottomRightRadius: normalize(50)
    }
});