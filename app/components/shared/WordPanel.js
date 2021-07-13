import React, { PureComponent } from 'react';
import { StyleSheet, View, Text , Dimensions, ScrollView} from 'react-native';
import { normalize, fonts,getSafeAreaViewHeight } from './../../assets/styles/index';
import { Button } from 'native-base';
import TextTicker from 'react-native-text-ticker';
import WordSpeech from './../shared/WordSpeech';
export default class WordPanel extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            hideExample: this.props.hideExample
        }
    }
    componentDidMount() {
        this.setState({hideExample: this.props.hideExample})
    }
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({hideExample: props.hideExample})
    }
    renderText(type) {
        if(this.props.params && this.props.params.ex && this.props.params.ex.length > 0) {
            /*
            return this.props.params.ex.map((item, index) => {
                const textWord = item.ex_word.split(' ');
                const textMean = item.ex_meaning.split(' ');
                const word = this.props.params.word
                return <View style={{paddingTop: 10}}>
                        <Text style={[styles.exampleSection, fonts.familyRegular]}>{textWord.map(text => {
                        if (text == word) {
                        return <Text style={[styles.exampleSection, fonts.familyBold, {color: '#EB5757'}]}>{text} </Text>;
                        }
                        return `${text} `;
                    })}</Text>
                    {
                        this.state.hideExample ?
                        null
                        :
                        <Text style={[styles.exampleSection, fonts.familyRegular]}>{textMean.map(text => {
                            if (text == word) {
                            return <Text style={[styles.exampleSection, fonts.familyBold, {color: '#EB5757'}]}>{text} </Text>;
                            }
                            return `${text} `;
                        })}</Text>
                        
                    }
                    
                </View>;
            })*/
            return this.props.params.ex.map((item, index) => {
                let ex_word = item.ex_word.replace(/\n/g, '');
                let ex_meaning = item.ex_meaning.replace(/\n/g, '');
                let indexArray = [], kor_indexArray = [];
                for(let i = 0; i < item.en_words.length; i ++)
                {
                    if( ex_word.indexOf(item.en_words[i]) >= 0 ) {
                        indexArray.push([ex_word.indexOf(item.en_words[i]), ex_word.indexOf(item.en_words[i]) + item.en_words[i].length])
                    }
                }
                for(let i = 0; i < item.ko_words.length; i ++) 
                {
                    if( ex_meaning.indexOf(item.ko_words[i]) >= 0 ) {
                        kor_indexArray.push([ex_meaning.indexOf(item.ko_words[i]), ex_meaning.indexOf(item.ko_words[i]) + item.ko_words[i].length])
                    }
                }
                return <View style={{paddingTop: 10}}>
                {
                    indexArray.length > 0 ?
                        indexArray.map((_item, _index) => {
                            return <Text style={[styles.exampleSection, fonts.familyRegular]}>{ ex_word.substring(_index == 0 ? 0 : indexArray[_index - 1][1], _item[0]) }
                                        <Text style={[{color: '#EB5757'}, fonts.familyBold]}>
                                            {ex_word.substring(_item[0], _item[1])}
                                        </Text>
                                        {ex_word.substring(_item[1], _index == indexArray.length - 1 ? ex_word.length : indexArray[_index + 1][0])}
                                   </Text>
                        })
                    :
                    <Text style={[styles.exampleSection, fonts.familyRegular]}>{ex_word}</Text>
                }
                {
                    this.state.hideExample ?
                    null
                    :
                        kor_indexArray.length > 0 ?
                            kor_indexArray.map((_item, _index) => {
                                return <Text style={[styles.exampleSection, fonts.familyRegular]}>{ ex_meaning.substring(_index == 0 ? 0 : kor_indexArray[_index - 1][1], _item[0]) }
                                        <Text style={[{color: '#EB5757'}, fonts.familyBold]}>
                                            {ex_meaning.substring(_item[0], _item[1])}
                                        </Text>
                                        {ex_meaning.substring(_item[1], _index == kor_indexArray.length - 1 ? ex_meaning.length : kor_indexArray[_index + 1][0])}
                                   </Text>
                            }) 
                        :
                        <Text style={[styles.exampleSection, fonts.familyRegular]}>{ ex_meaning }</Text>
                }   
                </View>;
            });
        }
    }
    render()    {
        return (
            <View style={[styles.child, { backgroundColor: '#E4E4E4', flex: 1}]}>
                <View style={styles.upWordContainer}>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
                        <View style={{marginHorizontal: normalize(10)}}>
                            <TextTicker
                                duration={6000} loop
                                repeatSpacer={50} marqueeDelay={1000} style={[fonts.size24, fonts.familyBold]}>{this.props.params.word}</TextTicker>

                        </View>
                        <View style={{marginTop: normalize(6), marginHorizontal: normalize(10), position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[fonts.familyBold, fonts.size20, {color: 'rgba(0,0,0,0.5)'}]}>{this.props.params.pronunciation}</Text>
                            <View style={{position: 'absolute', top: normalize(24), zIndex: 1001}}>
                                <WordSpeech wordView word={this.props.params.word} />
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.downMeaningContainer}>
                        <View style={{paddingHorizontal: normalize(16)}}>
                            <View style={{paddingTop: normalize(0), paddingBottom: normalize(0), 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            paddingTop: 10}}>
                                {
                                    this.props.hideMeaning ? 
                                    <Button style={styles.altButton}
                                    onPress={() => this.props.changeHideMeaning(!this.props.hideMeaning)}>
                                        <Text style={[fonts.size15, fonts.familyRegular]}>터치하여 단어 뜻 보기</Text>
                                    </Button>
                                    :
                                    <Text style={[fonts.size18, fonts.familyBold, {lineHeight: 24}]}>{this.props.params.meaning}</Text>
                                }
                            </View>
                            <View style={{paddingBottom: normalize(8)}}>
                                {
                                    this.renderText('en')
                                }
                                {
                                    this.state.hideExample ? 
                                    <Button style={[styles.altButton, {marginTop: normalize(8)}]}
                                    onPress={() => this.props.changeHideExample(!this.props.hideExample)}>
                                        <Text style={[fonts.size15, fonts.familyRegular]}>터치하여 예문 해석 보기</Text>
                                    </Button>
                                    :
                                    null
                                }
                            </View>
                        </View>
                    </View>    
                </ScrollView>     
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    child: { width },
    upWordContainer: {
        backgroundColor: '#F4F4F4',
        height: Math.floor((getSafeAreaViewHeight() - 32)/21 * 8)
    },
    downMeaningContainer: {
        flex: 1,
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
