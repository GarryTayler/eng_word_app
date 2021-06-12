import React from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Container, Content } from 'native-base';
import UserHeader from './../components/shared/UserHeader';
import { fonts, normalize } from './../assets/styles';
import { Icon } from 'react-native-elements';

let pageTitle = '단어목록보기';

export default class WordListView extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Container>
                <UserHeader title={pageTitle} />
                <Content style={styles.container}>
                    <View style={styles.subHeader}>
                        <Text style={[fonts.size10, fonts.weightBold, {textAlign: 'right', backgroundColor: 'red'}]}>중1 비상 (홍민표) 1과 3월월우을중왈가왈</Text>
                    </View>
                    <ScrollView style={{paddingBottom: normalize(120)}}>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.wordListItem}>
                            <View><Text style={[fonts.size12, fonts.weightBold]}>1 / 156</Text></View>
                            <View style={{marginTop: normalize(8), display: 'flex', flexDirection: 'row', 
                                          alignItems: 'center'}}>
                                <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <Icon name='star' type='antdesign' color='rgba(0,0,0,0.2)' />
                                </View>
                                <View style={{flex: 4, paddingLeft: normalize(8), paddingRight: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>develop</Text>
                                </View>
                                <View style={{flex: 6, paddingRight: normalize(8), paddingLeft: normalize(4)}}>
                                    <Text numberOfLines={1} style={[fonts.size18, fonts.weightBold]}>앉아있는, 정지한, 정지한 </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <View style={styles.wordPronunciationSound}>
                                        <Icon name='volume-medium' type='ionicon' color='rgba(0,0,0,0.6)' />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subHeader: {
        paddingRight: normalize(8),
        paddingTop: normalize(8),
        paddingBottom: normalize(8),
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    wordListItem: {     
        paddingLeft: normalize(18),
        paddingRight: normalize(12),
        paddingTop: normalize(12),
        paddingBottom: normalize(6),
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)'
    },
    wordPronunciationSound: {
        backgroundColor: '#F4F4F4', 
        width: normalize(32),
        height: normalize(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32
    }
});