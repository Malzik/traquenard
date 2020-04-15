import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";

class Question2Component extends React.Component {
    constructor(props) {
        super(props);

        const texts = [
            "text.question.win",
            "text.question.loose",
            "text.question.win.description",
            "text.question.loose.description"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.gameReducer.texts[text];
        });

        let title;
        let description;
        if (this.props.vPlayerAnswer.true_false) {
            title = textCollection["text.question.win"];
            description = textCollection["text.question.win.description"];
        } else {
            title = textCollection["text.question.loose"];
            description = textCollection["text.question.loose.description"];
        }

        this.state = {
            question: this.props.vQuestion,
            answerPlayer: this.props.vPlayerAnswer,
            title,
            description,
            texts: textCollection
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity style={ styles.container } onPress={() => this.props.changeScene("everyoneplay")}>
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
                        this.state.question.answers.map(answer => {
                            return <View style={{flex: 0.47}}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: 20, fontFamily: "MainTitle"
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

Question2Component.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Question2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(Question2Component);

export { Question2, Question2Component };
