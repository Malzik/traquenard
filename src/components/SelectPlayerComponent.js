import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {Input} from 'react-native-elements';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";


class SelectPlayerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [
                {name: 'Jean', sipCount: 0, sipGiven: 0},
                {name: 'Rene', sipCount: 0, sipGiven: 0},
                {name: 'Bebe', sipCount: 0, sipGiven: 0},
            ],
            currentPlayer: "",
            errors: {
                addPlayer: ""
            }
        }
    }

    addPlayer() {
        if (this.state.currentPlayer.length > 0) {
            const newPlayer = {name: this.state.currentPlayer, sipCount: 0, sipGiven: 0};
            this.setState({
                players: [...this.state.players, newPlayer],
                currentPlayer: "",
                errors: {...this.state.errors, addPlayer: ""}
            })
        } else {
            this.setState({
                errors: {...this.state.errors, addPlayer: "Le nom de peut pas être vide"}
            })
        }
    }

    startGame() {
        this.props.addPlayers(this.state.players);
        this.props.navigation.navigate('SelectDifficulty')
    }

    removePlayer(index) {
        console.log(index);
        this.setState({
            players: this.state.players.filter(function (item, stateIndex) {
                return index !== stateIndex
            })
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Traquenard </Text>
                </View>
                <View style={ styles.content }>
                    <View style={ styles.list }>
                        <FlatList
                            data={this.state.players}
                            renderItem={({ item, index }) => (
                                <View style={ styles.player }>
                                    <Text>{item.name}</Text>
                                    <Button title="Supp" onPress={() => {
                                        this.removePlayer(index);
                                    }} />
                                </View>

                            )}
                        />
                    </View>
                    <Input
                        placeholder='Ajouter un joueur'
                        onChangeText={(text) => this.setState({currentPlayer: text})}
                        value={this.state.currentPlayer}
                    />
                    <Text>{this.state.errors.addPlayer}</Text>
                    <Button title="Solid Button" onPress={() => {
                        this.addPlayer();
                    }}/>
                </View>
                <View>
                    <Button title="Commencer" onPress={() => {
                        this.startGame()
                    }}/>
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
    list: {
        marginTop: 20,
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
        fontFamily: "Pacifico"
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


SelectPlayerComponent.propTypes = {
    changeScene: PropTypes.func,
    addPlayers: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(gameActions, dispatch);

const SelectPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPlayerComponent);

export {SelectPlayer, SelectPlayerComponent};
