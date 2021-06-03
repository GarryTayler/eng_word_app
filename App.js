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
 import MywordHome from './app/screens/myword/MywordHome';
 import Login from './app/screens/Login';
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
    $lightGray: '#A49E9E'
 });

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9f1ff'
    },
    tabBarStyle: {
      backgroundColor: 'white',
      height: 60,
      paddingBottom: 0,
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
                <StatusBar barStyle="dark-content" backgroundColor="#e9f1ff" />
                <Root>
                    <Router>

                        <Scene hideNavBar key="hidenav">
                            <Scene key="root" showLabel={false} initial>
                                <Scene key="tabbar" tabs wrap={false} tabBarStyle={styles.tabBarStyle} hideNavBar={true} >
                                    <Scene key="init" title="처음" reset="home" name="home" icon={TabBarIcon} initial>
                                        <Scene key="home" component={Home} initial />
                                    </Scene>

                                    <Scene key="myword" title="내단어장" reset="myword_home" name="myword_home" icon={TabBarIcon}>
                                        <Scene key="myword_home" component={MywordHome} initial />
                                    </Scene>

                                    <Scene key="mysentence" title="내문장" reset="mysentence_home" name="mysentence_home" icon={TabBarIcon}>
                                        <Scene key="mysentence_home" component={MywordHome} initial />
                                    </Scene>

                                    <Scene key="mymakingwords" title="내가만드는 단어장" reset="mymakingwords_home" name="mymakingwords_home" icon={TabBarIcon}>
                                        <Scene key="mymakingwords_home" component={MywordHome} initial />
                                    </Scene>

                                    <Scene key="studyresults" title="학습결과" reset="studyresults_home" name="studyresults_home" icon={TabBarIcon}>
                                        <Scene key="studyresults_home" component={MywordHome} initial />
                                    </Scene>
                                </Scene>
                            </Scene>
                            <Scene key="login" component={Login} />
                        </Scene>

                    </Router>
                </Root>
            </View>
        );
    }
 }


 export default App;