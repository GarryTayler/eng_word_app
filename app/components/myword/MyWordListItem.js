import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { fonts, normalize } from './../../assets/styles';
import CheckBox from 'react-native-check-box';
import { Icon } from 'react-native-elements';
import TextTicker from 'react-native-text-ticker';

export default class MyWordListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: this.props.isChecked,
            marqueeWordDisable: true,
            marqueeMeaningDisable: true,
            prevProps: {}
        }
    }
    doSwap() {
    }
    static getDerivedStateFromProps(props, state) {
        const prevProps = state.prevProps || {};
        const isChecked = prevProps.allChecked !== props.allChecked
        ? props.allChecked
        : state.isChecked;
        return {
            prevProps: props,
            isChecked
        }
    }

    triggerClicked() {
        let isChecked = this.state.isChecked; 
        this.setState({
            isChecked:!this.state.isChecked
        });
        this.props.onClick(!isChecked);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{position: 'absolute', top: normalize(4), left: normalize(12)}}>
                    <Text style={[fonts.size11]}>{this.props.currentNo}/{this.props.numberOfWords}</Text>
                </View>
                <View style={[styles.flexRowAlign]}>
                    <View style={[styles.flexRowAlign, {flex: 5}]}>
                        <CheckBox
                            onClick={()=>{
                                this.triggerClicked();
                            }}
                            isChecked={this.state.isChecked}
                            style={styles.checkBoxItem}
                        />
                        <View style={{flexShrink: 1}}>
                        {
                            this.props.wordShow ?
                                <TouchableOpacity
                            onPress={ () => { this.setState({marqueeWordDisable: !this.state.marqueeWordDisable}) } } activeOpacity={0.6}>
                                    <TextTicker disabled={this.state.marqueeWordDisable}
                                    isInteraction={false} duration={3000} loop
                                    repeatSpacer={50} marqueeDelay={1000} style={[fonts.size16, fonts.familyBold, {marginLeft: normalize(10)}]}>
                                        {this.props.word}
                                    </TextTicker>
                                </TouchableOpacity>
                            : <></>
                        }
                        </View>
                    </View>
                    {
                        this.props.meaningShow ? 
                        <TouchableOpacity style={{ flex:5, display: 'flex', flexDirection: 'row', paddingLeft: normalize(4) }}
                        activeOpacity={0.6}
                        onPress={ () => { this.setState({marqueeMeaningDisable: !this.state.marqueeMeaningDisable}) } } >
                            <TextTicker disabled={this.state.marqueeMeaningDisable}
                                isInteraction={false} duration={3000} loop
                                repeatSpacer={50} marqueeDelay={1000} style={[fonts.size14, fonts.familyBold]}>{this.props.meaning}</TextTicker>
                        </TouchableOpacity>
                        :
                        <View style={{ flex:5, display: 'flex', flexDirection: 'row', paddingLeft: normalize(4) }}></View>
                    }
                    <View style={{ flex:2, alignItems: 'flex-end' }}>
                        <TouchableHighlight style={styles.swapIconContainer}
                        onPress={ () => {this.doSwap()} } underlayColor="white" activeOpacity={0.8}>
                            <Icon name='arrow-swap' type='fontisto' color='rgba(0,0,0,0.5)'
                            style={styles.swapIcon} size={14} />
                        </TouchableHighlight>
                    </View>
                </View>
            </View>    
        );
    }   
}

const styles = StyleSheet.create({
    swapIcon: {
        transform: [{ rotate: '90deg'}]
    },
    swapIconContainer: {
        width: normalize(24), height: normalize(24),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(24),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 4
    },
    container: {
        paddingRight: normalize(12), paddingLeft: normalize(12),
        height: normalize(64),
        borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center', flexDirection: 'row',
        position: 'relative'
    },
    flexRowAlign: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});