import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";

class QuestionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "En quelle année la France à été sacrée championne du monde pour la première fois",
            answers: [
                {content: '1990', index: 0, true_false: 0},
                {content: '1994', index: 1, true_false: 0},
                {content: '1998', index: 2, true_false: 1},
                {content: '2000', index: 3, true_false: 0},
            ],
        }
    }
    render() {

        return (
            <View style={ styles.container }>
                <View style={ styles.contentTitle }>
                    <Text style={ styles.title }> {this.props.currentPlayer} répond à la question</Text>
                </View>
                <View style={ styles.contentQuestion }>
                    <Text style={ styles.questionText }>{this.state.question}</Text>
                </View>
                <View style={ styles.contentAnswer }>
                    <View style={ styles.duoQuestion }>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: "#2A2A2A",
                                borderRadius: 60}}
                                    title={this.state.answers[0].content}
                                    onPress={() => this.props.changeScene("everyoneplay")}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: "#2A2A2A",
                                borderRadius: 60 }}
                                    title={this.state.answers[1].content}
                                    onPress={() => this.props.changeScene("everyoneplay")}
                            />
                        </View>
                    </View>
                    <View style={ styles.duoQuestionBottom }>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle",
                            }} buttonStyle={{ backgroundColor: "#2A2A2A",
                                borderRadius: 60}}
                                    title={this.state.answers[2].content}
                                    onPress={() => this.props.changeScene("everyoneplay")}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button id={"4"} titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: "#2A2A2A",
                                borderRadius: 60}}
                                    title={this.state.answers[3].content}
                                    onPress={() => this.props.changeScene("everyoneplay")}
                            />
                        </View>
                    </View>
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
