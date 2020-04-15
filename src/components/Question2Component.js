import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";

class Question2Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: this.props.vAnswers,
            answerPlayer: this.props.vPlayerAnswer,
            titre: '',
            description: '',
        };
    }

    componentDidMount() {
        if (this.state.answerPlayer.true_false) {
            this.setState({titre: "Gagné", description: "Donne 5 gorgées"});
        } else {
            this.setState({titre: "Perdu !", description: "Prend 5 gorgées"});
        }
    }

    render() {
        return (
            <TouchableOpacity style={ styles.container } onPress={() => this.props.changeScene("everyoneplay")}>
                <View style={ styles.contentTitle }>
                    <Text style={ styles.title }>{this.state.titre}</Text>
                </View>
                <View style={styles.contentQuestion}>
                    <Text style={styles.questionText}>{this.state.description}</Text>
                </View>
                <View style={styles.contentAnswer}>
                    {
                        this.state.answers.map(answer => {
                            return <View style={styles.answer}>
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
