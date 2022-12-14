import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

class AnswerQuestionComponent extends React.Component {
    POINTS = 2;
    constructor(props) {
        super(props);

        const {selectedAnswer, question} = this.props.route.params;
        const texts = [
            "text.questions.win",
            "text.questions.loose",
            "text.questions.win.description",
            "text.questions.loose.description"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.textReducer.texts[text];
        });

        let title;
        let description;
        if (selectedAnswer.true_false) {
            title = textCollection["text.questions.win"];
            description = textCollection["text.questions.win.description"];
        } else {
            title = textCollection["text.questions.loose"];
            description = textCollection["text.questions.loose.description"];
        }

        this.state = {
            question: question,
            selectedAnswer,
            title,
            description,
            texts: textCollection
        };
    }

    changeScene() {
        const {navigation, addPoints, gameReducer, updateCurrentUser} = this.props;
        const { selectedAnswer } = this.state;

        addPoints(this.POINTS, selectedAnswer.true_false);

        if (gameReducer.showEveryone) {
            navigation.navigate("EveryonePlay")
        } else {
            updateCurrentUser();
            navigation.navigate("Card")
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}>
                        <FormattedText text={this.state.title}/>
                    </Text>
                </View>
                <View style={styles.contentQuestion}>
                    <Text style={styles.questionText}>
                        <FormattedText text={this.state.description} sip={this.state.question.sip}/>
                    </Text>
                </View>
                <View style={styles.contentAnswer}>
                    {
                        this.state.question.answers.map((answer, index) => {
                            return <View style={styles.answer} key={index.toString()}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: wp('6%'), fontFamily: "titre"
                                }} buttonStyle={{
                                    backgroundColor: (answer.true_false ? "#3FBD4E" : "#D42A2A"),
                                    borderRadius: wp('6%')
                                }}
                                        title={answer.content}
                                />
                            </View>
                        })
                    }
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
    contentTitle :{
        height: wp('17%'),
        justifyContent: 'center',
    },
    contentQuestion: {
        height: wp('52%'),
        justifyContent: 'center',
    },
    contentAnswer: {
        height: wp('30%'),
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    answer: {
        width: "50%",
        paddingHorizontal: wp('6%'),
        marginBottom: wp('2%')
    },
    title: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("10%"),
        fontFamily: "titre"
    },
    questionText: {
        padding: wp("5%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "questionText",
    },
});

AnswerQuestionComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const AnswerQuestion = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnswerQuestionComponent);

export {AnswerQuestion, AnswerQuestionComponent};
