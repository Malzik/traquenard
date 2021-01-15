import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

class AllComponent extends React.Component {
    static DUEL = 'duels';
    static FRIENDSHIP = 'friendships';
    static ONEVERSUSALL = 'oneversusall';
    static QUESTION = 'questions';
    constructor(props) {
        super(props);

        const {card} = this.props.route.params;

        this.state = {
            card,
            question: {
                question: null,
                sip: null
            },
            isButtonDisabled: true
        }
    }

    componentDidMount() {
        const {textReducer} = this.props;
        const {card} = this.state;

        const rules = textReducer[card.type];

        if (card.type === AllComponent.ONEVERSUSALL) {
           this.getRuleOneVersusAll(rules)
        } else {
            this.getRule(rules, card)
        }
        setTimeout(() => this.setState({ isButtonDisabled: false }), 1000);
    }

    getRule(rules, card) {
        const { removeQuestion} = this.props;
        const question = rules[Math.floor(Math.random() * rules.length)];
        this.setState({
            question
        });
        removeQuestion(card.type, question);
    }

    getRuleOneVersusAll(rules) {
        const { gameReducer, removeQuestionFromCategory} = this.props;

        const category = gameReducer.selectedCategory;
        const question = rules[category.name][Math.floor(Math.random() * rules[category.name].length)];
        this.setState({
            question
        });

        removeQuestionFromCategory(category.name, question);
    }

    changeScene() {
        const {navigation} = this.props;
        const {card} = this.state;

        navigation.navigate("WinLoose", {points: card.points, type: card.type})
    }

    render() {
        const {texts} = this.props.textReducer;
        const {card, isButtonDisabled} = this.state;
        const {question, sip} = this.state.question;

        return (
            <TouchableOpacity style={styles[card.type + 'Container']} disabled={isButtonDisabled} onPress={() => this.changeScene()}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>
                        <FormattedText text={texts['text.' + card.type + '.title']}/>
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
    duelsContainer: {
        flex: 1,
        backgroundColor: '#D47431',
    },
    friendshipsContainer: {
        flex: 1,
        backgroundColor: '#2A9BDA',
    },
    oneversusallContainer: {
        flex: 1,
        backgroundColor: '#DA2A2A',
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
        fontSize: wp("10%"),
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

AllComponent.propTypes = {
    removeQuestion: PropTypes.func,
    navigation: PropTypes.object,
    textReducer: PropTypes.object
};

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const All = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllComponent);

export { All, AllComponent };
