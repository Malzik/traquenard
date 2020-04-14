import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {Question2} from "./Question2Component";

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changeScene: false,
            question: {
                question: null,
                answers: []
            },
            playerAnswer: null
        }
    }

    componentDidMount(): void {
        const questions = this.props.gameReducer.questions;
        const question = questions[Math.floor(Math.random() * questions.length)];
        this.setState({
            question
        })
    }

    changeScene(playerAnswer) {
        this.setState({changeScene: true, playerAnswer});
    }

    renderAnswer() {
        return <Question2 vAnswers={this.state.question.answers} vPlayerAnswer={this.state.playerAnswer}/>
    }

    renderQuestion() {
        return (
            <View style={styles.container}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}> {this.props.currentPlayer} répond à la question</Text>
                </View>
                <View style={styles.contentQuestion}>
                    <Text style={styles.questionText}>{this.state.question.question}</Text>
                </View>
                <View style={styles.contentAnswer}>
                    {
                        this.state.question.answers.map(answer => {
                            return <View style={{flex: 0.47}}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: 20, fontFamily: "MainTitle"
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

    render() {
        return this.state.changeScene !== false ? this.renderAnswer() : this.renderQuestion();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE332',
    },
    contentTitle :{
        flex: 0.2,
        justifyContent: 'center',
    },
    contentQuestion: {
        flex: 0.55,
        justifyContent: 'center',
    },
    contentAnswer: {
        flex: 0.25,
        justifyContent: 'center',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    duoQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginHorizontal: 20,
    },
    duoQuestionBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        marginHorizontal: 20,
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
