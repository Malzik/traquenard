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
        console.log(this.props);
        this.state = {
            answers: this.props.vAnswers,
            answerPlayer: this.props.vPlayerAnswer,
            titre: '',
            description: '',
        };
    }

    componentDidMount() {
        if (this.state.answerPlayer.true_false === true){
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
                <View style={ styles.contentQuestion }>
                    <Text style={ styles.questionText }>{this.state.description}</Text>
                </View>
                <View style={ styles.contentAnswer }>
                    <View style={ styles.duoQuestion }>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: this.state.answers[0].color,
                                borderRadius: 60}}
                                    title={this.state.answers[0].content}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: this.state.answers[1].color,
                                borderRadius: 60 }}
                                    title={this.state.answers[1].content}
                            />
                        </View>
                    </View>
                    <View style={ styles.duoQuestionBottom }>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle",
                            }} buttonStyle={{ backgroundColor: this.state.answers[2].color,
                                borderRadius: 60}}
                                    title={this.state.answers[2].content}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button id={"4"} titleStyle={{textAlign: 'center', color: '#fff',
                                fontSize: 20,  fontFamily: "MainTitle"
                            }} buttonStyle={{ backgroundColor: this.state.answers[3].color,
                                borderRadius: 60}}
                                    title={this.state.answers[3].content}
                            />
                        </View>
                    </View>
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
