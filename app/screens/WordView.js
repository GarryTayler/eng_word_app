import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Container, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';

let pageTitle = '단어 보기';

export default class WordView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                    <View style={styles.upWordContainer}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: normalize(8), paddingVertical: normalize(4)}}>
                            <View style={{display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                                <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                <Text style={[fonts.colorRed, fonts.size14, fonts.weightBold, {marginLeft: normalize(4)}]}>11</Text>
                                <Text style={[fonts.size14, fonts.weightBold]}> / 156</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={[fonts.size14, fonts.weightBold, {textAlign: 'right'}]}>
                                    고1 모의고사 2018년 3월 4월 모의고사 진행중
                                </Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                            <Text style={[fonts.size32, fonts.weightBold]}>develop</Text>
                        </View>
                    </View>
                    <View style={styles.downMeaningContainer}>
                    </View>
                </Content>              
            </Container>           
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    upWordContainer: {
        backgroundColor: '#F4F4F4',
        height: normalize(309)
    },
    downMeaningContainer: {
        backgroundColor: '#E4E4E4'
    }
});