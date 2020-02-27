import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";


class EndGameComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    restart() {
        this.props.restartGame();
        this.props.navigation.navigate('SelectPlayer');
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Traquenard </Text>
                </View>
                <View style={ styles.content }>
                    <Button title="Fin de la partie" onPress={() => {
                        this.restart();
                    }} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    },
    header: {
        height: 80,
        padding: 38,
        backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },

});

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const EndGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EndGameComponent);

export {EndGame, EndGameComponent};
