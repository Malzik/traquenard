import {Dimensions, StyleSheet, Text, View} from "react-native";
import React, { Component } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {AnswerQuestion} from "./AnswerQuestionComponent";
import {FormattedText} from "./helpers/FormattedText";

class QuestionComponent extends React.Component {
    static TYPE = "question";
    constructor(props) {
        super(props);

        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            changeScene: false,
            question: {
                question: null,
                answers: []
            }
        }
        this.onLayout = this.onLayout.bind(this);
    }

    onLayout(e) {
        this.setState({
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        });
    }

    componentDidMount() {
        const {textReducer, removeQuestion} = this.props;

        const questions = textReducer.questions;
        const question = questions[Math.floor(Math.random() * questions.length)];
        this.setState({
            question
        });
        removeQuestion("questions", question);
    }

    changeScene(selectedAnswer) {
        const {navigation} = this.props;
        const {question} = this.state;

        navigation.navigate("AnswerQuestion", {question, selectedAnswer})
    }

    render() {
        const {texts} = this.props.textReducer;
        const {question, answers} = this.state.question;

        return (
            <View style={styles.container}>
                <View style={styles.contentTitle}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.questions.title"]}/>
                    </Text>
                </View>
                <View style={styles.contentQuestion}>
                    <Text style={styles.questionText}>
                        <FormattedText text={question}/>
                    </Text>
                </View>
                <View style={styles.contentAnswer}>
                    {
                        answers.map((answer, index) => {
                            return <View style={styles.answer} key={index.toString()}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: wp('6%'), fontFamily: "titre"
                                }} buttonStyle={{
                                    backgroundColor: "#2A2A2A",
                                    borderRadius: wp('6%')
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
        height: wp('17%'),
        justifyContent: 'center',
    },
    contentQuestion: {
        height: wp('52%'),
        justifyContent: 'center',
        marginHorizontal:  wp('2%')
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
        fontSize: wp("7.5%"),
        fontFamily: "questionText",
    },
});

QuestionComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const Question = connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestionComponent);

export { Question, QuestionComponent };
