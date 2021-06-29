import React, { PureComponent } from 'react';
import { StyleSheet, View, Text , Dimensions} from 'react-native';
import { normalize, fonts,getSafeAreaViewHeight } from './../../assets/styles/index';
import { Button } from 'native-base';
export default class WordPanel extends PureComponent {
    constructor(props){
        super(props);
    }    
    render()    {
        return (
            <View style={[styles.child, { backgroundColor: '#E4E4E4' }]}>
                <View style={styles.upWordContainer}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                        <View style={{marginHorizontal: normalize(10)}}>
                            <Text numberOfLines={1} style={[fonts.size32, fonts.familyBold]}>{this.props.params.word}</Text>
                        </View>
                        <View style={{marginHorizontal: normalize(10), position: 'relative', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[fonts.familyBold, fonts.size20, {color: 'rgba(0,0,0,0.5)'}]}>[dɪˈveləp]</Text>
                            {
                                /* <WordSpeech wordView /> */
                            }
                        </View>
                    </View>
                </View>

                <View style={styles.downMeaningContainer}>
                    <View style={{paddingHorizontal: normalize(16)}}>
                        <View style={{paddingTop: normalize(0), paddingBottom: normalize(0), 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: normalize(56)}}>
                            {
                                this.props.hideMeaning ? 
                                <Button style={styles.altButton}
                                onPress={() => this.props.changeHideMeaning(!this.props.hideMeaning)}>
                                    <Text style={[fonts.size15, fonts.familyRegular]}>터치하여 단어 뜻 보기</Text>
                                </Button>
                                :
                                <Text style={[fonts.size18, fonts.familyBold]}>{this.props.params.meaning}</Text>
                            }
                        </View>
                        <View>
                            <Text style={[styles.exampleSection, fonts.familyRegular]}>
                                { this.props.params.ex_word }
                            </Text>

                            {
                                this.props.hideExample ? 
                                <Button style={[styles.altButton, {marginTop: normalize(8)}]}
                                onPress={() => this.props.changeHideExample(!this.props.hideExample)}>
                                    <Text style={[fonts.size15, fonts.familyRegular]}>터치하여 예문 해석 보기</Text>
                                </Button>
                                :
                                <Text style={[styles.exampleSection, fonts.familyRegular]}>
                                    { this.props.params.ex_meaning }
                                </Text>
                            }
                        </View>
                    </View>
                    {
                        /*
                        <View style={{marginBottom: normalize(20)}}>
                            <Button style={styles.altButton}>
                                <Text style={[fonts.size16]}>터치하여 단어 뜻 보기</Text>
                            </Button>
                        </View>
                        */
                    }
                </View>         
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    child: { width },
    upWordContainer: {
        backgroundColor: '#F4F4F4',
        height: Math.floor((getSafeAreaViewHeight() - 32)/7 * 3)
    },
    downMeaningContainer: {
        backgroundColor: '#E4E4E4'
    },    
    exampleSection: {
        fontSize: normalize(14),
        lineHeight: normalize(24)
    },
    altButton: {
        width: normalize(209),
        height: normalize(35),
        borderRadius: normalize(4),
        backgroundColor: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        alignSelf: 'center'
    }
});
