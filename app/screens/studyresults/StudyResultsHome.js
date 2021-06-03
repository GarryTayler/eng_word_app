import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
export default class StudyResultsHome extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Hi Study results home</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f1ff',
    }
});