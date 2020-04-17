import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {AnswerQuestion} from "./AnswerQuestionComponent";
import {FormattedText} from "./helpers/FormattedText";

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);

        let textCollection = {};
        textCollection["text.question.title"] = this.props.gameReducer.texts["text.selectOtherPlayer.title"];

        this.state = {
            changeScene: false,
            question: {
                question: null,
                answers: []
            },
            playerAnswer: null,
            texts: textCollection
        }
    }

    componentDidMount(): void {
        const questions = this.props.gameReducer.questions;
        const question = questions[Math.floor(Math.random() * questions.length)];
        this.setState({
            question
        })
    }

    changeScene(selectedAnswer): void {
        const {navigation} = this.props;
        const {question} = this.state;

        navigation.navigate("AnswerQuestion", {question, selectedAnswer})
    }

    render() {

        const {texts} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.question.title"]}/>
                    </Text>
                </View>
                <View style={styles.contentQuestion}>
                    <Text style={styles.questionText}>{this.state.question.question}</Text>
                </View>
                <View style={styles.contentAnswer}>
                    {
                        this.state.question.answers.map((answer, index) => {
                            return <View style={styles.answer} key={index.toString()}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: 25, fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: "#2A2A2A",
                                    borderRadius: 60
                                }}
                                        title={answer.content}
                                        onPress={() => this.changeScene(answer)}
                                />
                            </View>
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE332',
    },
    contentTitle :{
        flex: 0.15,
        justifyContent: 'center',
    },
    contentQuestion: {
        flex: 0.52,
        justifyContent: 'center',
    },
    contentAnswer: {
        flex: 0.33,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    answer: {
        width: "50%",
        paddingHorizontal: 20,
        marginBottom: 10
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    questionText: {
        padding: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontFamily: "questionText",
        marginBottom: 30,
    },
});

QuestionComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Question = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionComponent);

export { Question, QuestionComponent };
