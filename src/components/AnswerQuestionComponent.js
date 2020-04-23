import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";

class AnswerQuestionComponent extends React.Component {
    constructor(props) {
        super(props);

        const {selectedAnswer, question} = this.props.route.params;
        const texts = [
            "text.question.win",
            "text.question.loose",
            "text.question.win.description",
            "text.question.loose.description"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.textReducer.texts[text];
        });

        let title;
        let description;
        if (selectedAnswer.true_false) {
            title = textCollection["text.question.win"];
            description = textCollection["text.question.win.description"];
        } else {
            title = textCollection["text.question.loose"];
            description = textCollection["text.question.loose.description"];
        }

        this.state = {
            question: question,
            answerPlayer: selectedAnswer,
            title,
            description,
            texts: textCollection
        };
    }

    changeScene(): void {
        const {navigation, addSip} = this.props;
        const {question} = this.state;

        addSip(question.sip);
        navigation.navigate("EveryonePlay")
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}><FormattedText text={this.state.title}/></Text>
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
                                    fontSize: 25, fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: (answer.true_false ? "#3FBD4E" : "#D42A2A"),
                                    borderRadius: 60
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
        height: "15%",
        justifyContent: 'center',
    },
    contentQuestion: {
        height: "52%",
        justifyContent: 'center',
    },
    contentAnswer: {
        height: "33%",
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
