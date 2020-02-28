import React from "react";
import {FlatList, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from "react-native";
import {Input, Button} from 'react-native-elements';
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
                        <ScrollView style={ styles.scroll }>
                            <FlatList
                                data={this.state.players}
                                renderItem={({ item, index }) => (
                                    <View style={ styles.player }>
                                        <Text style={ styles.textPlayer }>{item.name}</Text>
                                        <TouchableOpacity onPress={() => this.removePlayer(index)}>
                                            <Image source={require('./icons/delete.png')} style={{width: 30, height: 30}}/>
                                        </TouchableOpacity>
                                    </View>

                                )}
                            />
                        </ScrollView>
                    </View>
                    <View style={ styles.addInputButton }>
                        <View style={{flex: 0.9}}>
                            <Input
                                placeholder='Ajouter un joueur'
                                onChangeText={(text) => this.setState({currentPlayer: text})}
                                value={this.state.currentPlayer}
                            />
                        </View>
                        <View style={{flex: 0.1}}>
                            <TouchableOpacity onPress={() => this.addPlayer()}>
                                <Image source={require('./icons/add.png')} style={{width: 30, height: 30}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Button titleStyle={{textAlign: 'center', color: '#fff',
                        fontSize: 20,  fontFamily: "Pacifico"
                    }} buttonStyle={{ backgroundColor: "#FF7C02",
                                borderRadius: 60, width: 200, }}
                            title="Commencer" onPress={() => { this.startGame()
                    }}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF9C40',
    },
    content: {
        flex: 0.45,
        padding: 40,
    },
    list: {
        marginTop: 20,
    },
    header: {
        height: 80,
        padding: 38,
        backgroundColor: '#FF9C40',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontFamily: "Pacifico"
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    start: {
        flex: 1,
        flexDirection: 'row',
    },
    scroll: {
        height: 150,
    },
    marge: {
        marginTop: 30,
    },
    textPlayer: {
        fontSize: 15,
        marginBottom: 20,
        marginLeft: 20,
    },
    addInputButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    }
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
