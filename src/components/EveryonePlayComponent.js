import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";

class EveryonePlayComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            everyone: {
                question: null,
                sip: null
            }
        };
    }

    componentDidMount(): void {
        const everyone = this.props.gameReducer.everyone;
        const question = everyone[Math.floor(Math.random() * everyone.length)];
        this.setState({
            everyone: question
        })
    }

    changeCurrentPlayer() {
        this.props.updateCurrentUser();
        this.props.changeScene("card");
    }

    render() {

        return (
            <TouchableOpacity style={ styles.container } onPress={() => this.changeCurrentPlayer()}>
                <View style={ styles.flex1 }>
                    <Text style={ styles.title }> Tout le monde joue !</Text>
                </View>
                <View style={ styles.flex2 }>
                    <Text style={styles.questionText}>{this.state.everyone.question}</Text>
                </View>
                <View style={ styles.flex3 }>
                    <Text style={styles.gorgeesText}>{this.state.everyone.sip} Gorgées en jeu</Text>
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
    flex1: {
        flex: 0.2,
        padding: 10,
    },
    flex2: {
        flex: 0.6,
        justifyContent: 'center',
        marginBottom: 10,
    },
    flex3: {
        flex: 0.2,
        marginRight: 30
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
    },
    gorgeesText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
    }
});

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const EveryonePlay = connect(
    mapStateToProps,
    mapDispatchToProps
)(EveryonePlayComponent);

export {EveryonePlay, EveryonePlayComponent};
