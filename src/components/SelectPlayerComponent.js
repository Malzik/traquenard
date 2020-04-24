import React from "react";
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-elements';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import * as ScreenOrientation from "expo/build/ScreenOrientation/ScreenOrientation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


class SelectPlayerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [],
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
                errors: {...this.state.errors, addPlayer: "Le nom ne peut pas être vide"}
            })
        }
    }

    async changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

    startGame() {
        const {addPlayers, initGame, navigation} = this.props;
        this.changeScreenOrientation();

        initGame();
        addPlayers(this.state.players);
        navigation.navigate('SelectDifficulty')
    }

    checkEnoughPlayer() {
        return this.state.players.length < 2;
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
                            fontSize: wp("9%"), fontFamily: "MainTitle"
                        }} buttonStyle={{
                            backgroundColor: "#DA2A2A",
                            borderRadius: wp("10%"), width: wp("70%"),
                        }}
                                title="Commencer"
                                onPress={() => {this.startGame()}}
                                disabled={this.checkEnoughPlayer()}
                        />
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
        height: "80%"
    },
    header: {
        height: "15%"
    },
    middle: {
        height: "60%"
    },
    bottom: {
        height: "20%",
        alignItems: 'center'
    },
    list: {
        marginTop: wp("10%"),
        paddingHorizontal: wp("11%"),
        height: wp("40%")
    },
    title: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("10%"),
        fontFamily: "titre"
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textPlayer: {
        fontSize: wp("6%"),
        color: '#fff',
        fontFamily: 'ABeeZee-Regular',
        marginBottom: wp("4.5%"),
    },
    addInputButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp("11%"),
        marginTop: wp("8%"),
    },
    textInputPlayer: {
        color: '#fff',
        fontSize: wp("6%"),
        fontFamily: 'ABeeZee-Regular',
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
