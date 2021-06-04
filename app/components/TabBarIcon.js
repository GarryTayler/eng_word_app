import * as React from 'react';
import { StyleSheet , View , ImageBackground, Text, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Images from './../assets/Images';
import { getTabWidth, fonts } from './../assets/styles/index';

export default function TabBarIcon(props) {
    return (
        <TouchableOpacity style={styles.tabItem} onPress={() => Actions.reset(props.reset)}>
            <ImageBackground
              source={props.name == 'home' ? Images.homeTab : (
                props.name == 'my_word_home' ? Images.myWordTab : (
                props.name == 'my_sentence_home' ? Images.mySentenceTab : (
                props.name == 'my_making_words_home' ? Images.myMakingWordTab : Images.studyResults
              )))}
              style={styles.tabImage}
              resizeMode='cover'
            >
              <View style={styles.tabItemContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={[props.focused ? fonts.colorRed : fonts.colorWhite,
                                  fonts.basicFamily,
                                  fonts.size14,
                                  fonts.weightBold]}>{props.title}</Text>
                  </View>
              </View>
            </ImageBackground>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
  tabItem: {
    height: Platform.OS == 'ios' ? 95 : 95,
    width: getTabWidth()
  },
  tabImage: {
      flex: 1
  },
  tabItemContainer: {
    flex: 1,
    position: 'relative'
  },
  labelContainer: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: 36,
    bottom: 0,
    alignItems: 'center', justifyContent:'center'
  }
});