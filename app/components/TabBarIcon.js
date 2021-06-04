import * as React from 'react';
import { StyleSheet , View , ImageBackground, Text, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import Images from "../../assets/Images";
import Images from './../assets/Images';

export default function TabBarIcon(props) {
    return (
        <TouchableOpacity style={styles.tab_item} onPress={() => Actions.reset(props.reset)}>
            <ImageBackground
              source={props.name == 'home' ? Images.homeTab : (
                props.name == 'my_word_home' ? Images.myWordTab : (
                props.name == 'my_sentence_home' ? Images.mySentenceTab : (
                props.name == 'my_making_words_home' ? Images.myMakingWordTab : Images.studyResults
              )))}
              style={styles.image}
              resizeMode='cover'
            >
              <View>
                <Text style={{color: props.focused ? 'red' : '#1b1c1d' , marginTop: 0, fontSize: 11, paddingVertical: Platform.OS == 'ios' ? 10 : 0}}>{props.title}</Text>
              </View>
            </ImageBackground>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
  tab_item: {
    height: Platform.OS == 'ios' ? 95 : 95,
    backgroundColor: 'green',
    width: 75
  },
  image: {
      flex: 1,
      //resizeMode: "contain"
  }
});