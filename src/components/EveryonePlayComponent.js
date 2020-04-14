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
            <View style={ styles.container }>
                <TouchableOpacity  onPress={() => this.changeCurrentPlayer()}>
                    <View>
                        <Text style={ styles.title }> Tout le monde joue !</Text>
                    </View>
                    <View>
                        <Text style={styles.questionText}>{this.state.everyone.question}</Text>
                    </View>
                    <View>
                        <Text style={styles.gorgeesText}>{this.state.everyone.sip} Gorgées en jeu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        padding: 10,
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        padding: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
        marginBottom: 20,
    },
    gorgeesText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
        padding: 10,
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
