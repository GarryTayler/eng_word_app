import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ResultDetailItem from './../../components/studyresults/ResultDetailItem';
export default class StudyResultsDetailTab extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
                <>
                {
                    <FlatList
                        data={this.props.problemList}
                        keyExtractor={(item) => item.word_id}
                        renderItem={({item, index}) => (
                            <ResultDetailItem 
                            currentNo={index + 1} 
                            word={item.problem} 
                            meaning={item.user_answer} 
                            correctAnswer={item.answer}
                            correct={item.result == 'correct' ? true : false}
                            wrong={item.result != 'correct' ? true : false}
                            wordId={item.word_id}
                            wordItem={item.word_item}
                            isFavorite={item.is_favorite} />    
                        )}
                    />
                }
                </>
        );
    }
}