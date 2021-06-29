import React, { PureComponent } from 'react';
import { StyleSheet, View, Text , Dimensions} from 'react-native';
import { normalize, fonts,getSafeAreaViewHeight } from './../../assets/styles/index';
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
                        <View style={{paddingTop: normalize(16), paddingBottom: normalize(8)}}>
                            <Text style={[fonts.size18, fonts.familyBold, {textAlign: 'center'}]}>{this.props.params.meaning}</Text>
                        </View>
                        <View>
                            <Text style={[styles.exampleSection, fonts.familyRegular]}>
                                { /* An American airline was intent on <Text style={[fonts.colorRed, fonts.familyMedium]}>develop</Text> the lake as a tourist destination for fishermen. */ }
                                { this.props.params.ex_word }
                            </Text>
                            <Text style={[styles.exampleSection, fonts.familyRegular]}>
                                { /* 한 미국 항공사가 그 호수를 낚시꾼들을 위한 관광지로 <Text style={[fonts.colorRed, fonts.familyMedium]}>개발하는</Text> 것에 매우 관심을 보였다. */ }
                                { this.props.params.ex_meaning }
                            </Text>
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
});
