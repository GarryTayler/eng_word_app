import * as React from 'react';
import { StyleSheet , View , Text, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default function TabBarIcon(props) {
    return (
        <TouchableOpacity style={styles.tab_item} onPress={() => Actions.reset(props.reset)}>
          <Text style={{color: props.focused ? '#1b1c1d' : '#1b1c1d' , marginTop: 0, fontSize: 11, paddingVertical: Platform.OS == 'ios' ? 10 : 0}}>{props.title}</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
  tab_item: {
    alignItems: 'center',
    justifyContent:"flex-end",
    height: Platform.OS == 'ios' ? 55 : 65
  }
});