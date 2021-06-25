import React from 'react';
import { Container, Content, Button } from 'native-base';
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import UserHeader from './../../components/shared/UserHeader';

let pageTitle = '단어 학습';

export default class WordStudyInit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            problemMethod: 'sub',
            studyMethod: 'entoko',
            progressOrder: 'sequence',
            startNumber: '',
            endNumber: ''
        }
    }
    render()     {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                    <View style={{marginTop: normalize(25)}}>
                        <Text style={[fonts.size16, {textAlign: 'center'}]}>단어 학습 모드를 설정해주세요.</Text>
                    </View>
                    <View style={{marginTop: normalize(30)}}>
                        <View style={styles.methodItem}>
                            <View style={{flex: 2}}>
                                <Icon name="pencil" type='evilicon' />
                            </View>
                            <View style={{flex: 10}}>
                                <Text style={[fonts.size16, fonts.weightBold]}>단어 문제 방식</Text>
                            </View>
                        </View>
                        <View  style={[{ display:'flex', flexDirection:'row', paddingTop: normalize(6)}]}>
                            <CheckBox
                                title='객관식'
                                checked={this.state.problemMethod == 'obj'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', flex: 1, paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                            <CheckBox
                                title='주관식'
                                checked={this.state.problemMethod == 'sub'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', flex: 1, paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                        </View>
                    </View>
                    <View style={{marginTop: normalize(20)}}>
                        <View style={styles.methodItem}>
                            <View style={{flex: 2}}>
                                <Icon name="eye" type='evilicon' />
                            </View>
                            <View style={{flex: 10}}>
                                <Text style={[fonts.size16, fonts.weightBold]}>단어 학습 방식</Text>
                            </View>
                        </View>
                        <View  style={[{ display:'flex', paddingTop: normalize(6)}]}>
                            <CheckBox
                                title='영어 문제를 한글로 풀기'
                                checked={this.state.studyMethod == 'entoko'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                            <CheckBox
                                title='한글 문제를 영어로 풀기'
                                checked={this.state.studyMethod == 'kotoen'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                        </View>
                    </View>

                    <View style={{marginTop: normalize(20)}}>
                        <View style={styles.methodItem}>
                            <View style={{flex: 2}}>
                                <Icon name="refresh" type='evilicon' />
                            </View>
                            <View style={{flex: 10}}>
                                <Text style={[fonts.size16, fonts.weightBold]}>단어 진행 순서</Text>
                            </View>
                        </View>
                        <View  style={[{ display:'flex' , flexDirection:'row' , alignItems: 'center', paddingTop: normalize(6)}]}>
                            <CheckBox
                                title='순서대로'
                                checked={this.state.progressOrder == 'sequence'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', flex: 1, paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                            <CheckBox
                                title='임의대로'
                                checked={this.state.progressOrder == 'random'}
                                containerStyle={{backgroundColor: '#F4F4F4', borderColor: '#F4F4F4', flex: 1, paddingVertical: 0}}
                                textStyle={[fonts.size16, fonts.weightNormal, fonts.colorBlack]}
                                checkedColor='#6FCF97'
                                />
                        </View>
                    </View>


                    <View style={{marginTop: normalize(20), paddingBottom: normalize(10)}}>
                        <View style={styles.methodItem}>
                            <View style={{flex: 2}}>
                                <Icon name="retweet" type='evilicon' /> 
                            </View>
                            <View style={{flex: 10}}>
                                <Text style={[fonts.size16, fonts.weightBold]}>단어 문제 번호</Text>
                            </View>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', paddingTop: normalize(12)}}>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1,
                            justifyContent: 'center'}}>
                                <Text style={[fonts.size16, fonts.weightNormal]}>
                                    시작번호
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(text) => {
                                        this.setState({ startNumber: text });
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    value={this.state.startNumber}
                                >
                                </TextInput>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1,
                            justifyContent: 'center'}}>
                                <Text style={[fonts.size16, fonts.weightNormal]}>
                                    끝번호
                                </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(text) => {
                                        this.setState({ endNumber: text });
                                    }}
                                    onSubmitEditing={Keyboard.dismiss}
                                    value={this.state.endNumber}
                                >
                                </TextInput>
                            </View>
                        </View>
                    </View>
                </Content>     
                <View style={{backgroundColor: '#F4F4F4', paddingVertical: normalize(20)}}>
                    <View style={{ alignSelf: 'center' }}>
                        <Button style={styles.startButton}>
                            <Text style={[fonts.size22, fonts.weightBold]}>학습 시작 </Text>
                        </Button>                     
                    </View>          
                </View>
            </Container>           
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        paddingHorizontal: normalize(24)
    },
    methodItem: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        paddingBottom: normalize(6),
        display: 'flex',
        flexDirection: 'row'
    },
    startButton: {
        backgroundColor: 'white',
        width: normalize(272),
        height: normalize(64),
        borderRadius: normalize(16),
        borderColor: '#EB5757',
        borderWidth: 1,
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        margin: 'auto'
    },
    textInput: {
        height: normalize(32),
        width: normalize(56),
        paddingTop: normalize(6),
        paddingBottom: normalize(6),
        borderRadius: normalize(4),
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 4,
        textAlign: 'center',
        marginLeft: normalize(8)
    }
});