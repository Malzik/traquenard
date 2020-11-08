import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import * as textActions from '../store/actions/textAction';
import {bindActionCreators} from "redux";
import {FormattedText} from "./helpers/FormattedText";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

class EveryonePlayComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            everyone: {
                question: null,
                sip: null
            }
        };
    }

    componentDidMount(): void {
        const {textReducer, removeQuestion} = this.props;

        const everyone = textReducer.everyone;
        const question = everyone[Math.floor(Math.random() * everyone.length)];
        this.setState({
            everyone: question
        });
        removeQuestion("everyone", question);
    }

    async changeScene(): void {
        const {navigation, updateCurrentUser, addTurn, gameReducer} = this.props;

        updateCurrentUser();
        await addTurn();

        if (this.props.gameReducer.currentTurn >= gameReducer.maxTurn || this.props.textReducer.everyone.length === 0) {
            navigation.navigate("EndGame");
        } else {
            navigation.navigate("Card")
        }
    }

    render() {
        const {texts} = this.props.textReducer;
        const {question, sip} = this.state.everyone;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.everyonePlay.title"]}/>
                    </Text>
                </View>
                <View style={styles.flex2}>
                    <Text style={styles.questionText}>
                        <FormattedText text={question}/>
                    </Text>
                </View>
                <View style={styles.flex3}>
                    <Text style={styles.sipText}>
                        <FormattedText text={texts["text.sip"]} sip={sip}/>
                    </Text>
                </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    flex1: {
        height: wp('20%'),
        padding: wp("3%"),
    },
    flex2: {
        height: wp('60%'),
        justifyContent: 'center',
        marginHorizontal:  wp('2%')
    },
    flex3: {
        height: wp('20%'),
        marginRight: wp("6%")
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontSize: wp("11%"),
        fontFamily: "MainTitle"
    },
    questionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("7.5%"),
        fontFamily: "questionText",
    },
    sipText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "gorgeesText",
    }
});

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const EveryonePlay = connect(
    mapStateToProps,
    mapDispatchToProps
)(EveryonePlayComponent);

export {EveryonePlay, EveryonePlayComponent};
