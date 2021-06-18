/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { StyleSheet, View, StatusBar } from 'react-native';
 import { Router, Scene} from 'react-native-router-flux';
 import { Root } from "native-base";
 import EStyleSheet from 'react-native-extended-stylesheet';

 import Home from './app/screens/init/Home';
 import Category from './app/screens/init/Category';
 import Detail from './app/screens/init/Detail';

 import MyWordHome from './app/screens/myword/MyWordHome';
 import MySentenceHome from './app/screens/mysentence/MySentenceHome';
 import MyMakingWordsHome from './app/screens/mymakingwords/MyMakingWordsHome';

 import StudyResultsHome from './app/screens/studyresults/StudyResultsHome';
 import StudyResultsDetail from './app/screens/studyresults/StudyResultsDetail';

 import WordListView from './app/screens/WordListView';
 import WordView from './app/screens/WordView';

 import WordStudyInit from './app/screens/wordstudy/WordStudyInit';
 import WordStudyObject from './app/screens/wordstudy/WordStudyObject';
 import WordStudySubject from './app/screens/wordstudy/WordStudySubject';

 import SentenceStudyInit from './app/screens/sentencestudy/SentenceStudyInit';

 import TabBarIcon from './app/components/TabBarIcon';

 EStyleSheet.build({
    $themeColor: '#C3A3E8',
    $backgroundColor1: '#F4F4F4',
    $backgroundColor2: '#DBEAFE',
    $whiteColor: '#FFFFFF',
    $blackColor: '#000000',
    $blueColor: '#006DFF',
    $greenColor: '#44D24A',
    $lightBlueColor: '#68ADED',
    $lightBrownColor: '#FF9636',
    $lightBlackColor: '#424242',
    $mainColor2: '#E4E4E4',
    $skyBlue: '#1BA3E5',
    $darkGray: '#4E4E4E',
    $lightGray: '#A49E9E',
    $mainFontFamily: 'Malgun Gothic',
 });

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    tabBarStyle: {
      backgroundColor: 'white',
      height: 95,
      paddingLeft: 0,
      paddingRight: 0
    }
});

class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <Root>
                    <Router>

                        <Scene hideNavBar key="hidenav">
                            <Scene key="root" showLabel={false} initial>
                                <Scene key="tabbar" tabs wrap={false} tabBarStyle={styles.tabBarStyle} hideNavBar >
                                    <Scene key="init" title="처음" reset="category" name="category" icon={TabBarIcon} hideNavBar initial>
                                        <Scene key="home" component={Home} />
                                        <Scene key="category" component={Category} initial />
                                        <Scene key="detail" component={Detail} />
                                    </Scene>

                                    <Scene key="my_word" title="내단어장" reset="my_word_home" name="my_word_home" icon={TabBarIcon} hideNavBar>
                                        <Scene key="my_word_home" component={MyWordHome} initial />
                                    </Scene>

                                    <Scene key="my_sentence" title="내문장" reset="my_sentence_home" name="my_sentence_home" icon={TabBarIcon} hideNavBar>
                                        <Scene key="my_sentence_home" component={MySentenceHome} />
                                    </Scene>

                                    <Scene key="my_making_words" title="내가만드는 단어장" reset="my_making_words_home" name="my_making_words_home" icon={TabBarIcon} hideNavBar>
                                        <Scene key="my_making_words_home" component={MyMakingWordsHome} initial />
                                    </Scene>

                                    <Scene key="study_results" title="학습결과" reset="study_results_home" name="study_results_home" icon={TabBarIcon} hideNavBar>
                                        <Scene key="study_results_home" component={StudyResultsHome} initial />
                                    </Scene>
                                </Scene>
                            </Scene>
                            <Scene key="word_list_view" component={WordListView} />
                            <Scene key="word_view" component={WordView} />
                            <Scene key="study_results_detail" component={StudyResultsDetail} />
                            <Scene key="word_study_init" component={WordStudyInit} />
                            <Scene key="word_study_object" component={WordStudyObject} />
                            <Scene key="word_study_subject" component={WordStudySubject} />
                            <Scene key="sentence_study_init" component={SentenceStudyInit} initial />
                        </Scene>

                    </Router>
                </Root>
            </View>
        );
    }
 }


 export default App;