import React from "react";
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import * as ScreenOrientation from "expo/build/ScreenOrientation/ScreenOrientation";


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
        };
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
        const {addPlayers, initGame, navigation} = this.props;
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

        initGame();
        addPlayers(this.state.players);
        navigation.navigate('SelectDifficulty')
    }

    removePlayer(index) {
        this.setState({
            players: this.state.players.filter(function (item, stateIndex) {
                return index !== stateIndex
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}> Traquenard </Text>
                    </View>
                    <View style={styles.middle}>
                        <View style={styles.list}>
                            <FlatList
                                data={this.state.players}
                                renderItem={({item, index}) => (
                                    <View style={styles.player} id={index}>
                                        <Text style={styles.textPlayer}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => this.removePlayer(index)}>
                                            <Image source={require('./icons/delete.png')}
                                                   style={{width: 22, height: 22, opacity: 0.8}}/>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={styles.addInputButton}>
                            <View style={{flex: 0.9}}>
                                <TextInput
                                    style={styles.textInputPlayer}
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
                    <View style={styles.bottom}>
                        <Button titleStyle={{
                            textAlign: 'center', color: '#fff',
                            fontSize: 30, fontFamily: "MainTitle"
                        }} buttonStyle={{
                            backgroundColor: "#DA2A2A",
                            borderRadius: 60, width: 200,
                        }}
                                title="Commencer" onPress={() => {
                            this.startGame()
                        }}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    content: {
        height: "70%"
    },
    header: {
        height: "10%"
    },
    middle: {
        height: "60%"
    },
    bottom: {
        height: "20%",
        alignItems: 'center'
    },
    list: {
        marginTop: 50,
        paddingHorizontal: 40,
        height: 150
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scroll: {
        paddingHorizontal: 40,
        height: 150,
    },
    textPlayer: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'ABeeZee-Regular',
        marginBottom: 20,
    },
    addInputButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        marginTop: 30,
    },
    textInputPlayer: {
        color: '#fff',
        fontSize: 20,
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
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const SelectPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPlayerComponent);

export {SelectPlayer, SelectPlayerComponent};
