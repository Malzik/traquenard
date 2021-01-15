import React                                                                                                from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    InteractionManager,
    TouchableOpacity,
    View,
    Keyboard,
    ToastAndroid, Alert
}                                  from "react-native";
import {Button}                    from 'react-native-elements';
import PropTypes                   from "prop-types";
import {bindActionCreators}        from "redux";
import * as gameActions            from "../store/actions/gameAction";
import * as textActions            from "../store/actions/textAction";
import {connect}                   from "react-redux";
import * as ScreenOrientation      from 'expo-screen-orientation';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import AsyncStorage                from "@react-native-async-storage/async-storage";

class SelectPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            players: [].reverse(),
            currentPlayer: ""
        };
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    async componentDidMount() {
        await this.getStorageData()
        this.focusInputWithKeyboard()
    }

    async getStorageData() {
        try {
            await AsyncStorage.getItem('players').then(response => {
                if (response !== null) {
                    this.renderAlert(response)
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    renderAlert(players) {
        Alert.alert("",
            "Voulez-vous continuer avec les joueurs de la dernière partie ?",
            [
                {
                    text: 'OUI',
                    onPress: () => this.setState({players: JSON.parse(players)})
                },
                {
                    text: 'NON',
                    onPress: () => {
                        AsyncStorage.removeItem('players')
                    }
                }
            ],
            {cancelable: false})
    }

    showToast(message) {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    };

    playerAlreadyExist(name) {
        const find = this.state.players.find(player => player.name === name)

        return find !== undefined;
    }

    addPlayer() {
        const playerName = this.state.currentPlayer.trim();
        if (playerName.length > 0) {
            if(this.playerAlreadyExist(playerName)){
                this.showToast("Un joueur a déjà le même nom")
                return;
            }
            const newPlayer = {name: this.state.currentPlayer, points: 0};
            this.setState({
                players: [newPlayer, ...this.state.players],
                currentPlayer: "",
                errors: {...this.state.errors, addPlayer: ""}
            })
        } else {
            this.showToast("Le nom ne peut pas être vide")
        }
    }

    async changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }

    startGame() {
        const {addPlayers, initGame, navigation} = this.props;
        Keyboard.dismiss()
        this.changeScreenOrientation().then(() => {
            initGame();
            addPlayers(this.state.players);
            this.savePlayers().then(() => {
                navigation.navigate('SelectDifficulty')
            })
        });
    }

    async savePlayers() {
        await AsyncStorage.setItem("players", JSON.stringify(this.state.players))
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

    inputRef = React.createRef();

    focusInputWithKeyboard() {
        InteractionManager.runAfterInteractions(() => {
            this.inputRef.current.focus()
        });
    }

    message(){
        if (this.state.players.length < 1){
            return(
                <View style={styles.messageView}>
                    <Image source={require('./icons/info.png')}
                           style={{width: wp("9%"), height: wp("9%")}}/>
                    <Text style={styles.message}>Ajouter au moins 2 joueurs pour jouer !</Text>
                </View>
            )
        }
        else {
            return(
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
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title_captain}> Captain Gnole </Text>
                    </View>
                    <View style={styles.middle}>
                        {this.message()}
                        <View style={styles.addInputButton}>
                            <View style={{flex: 0.9}}>
                                <TextInput
                                    ref={this.inputRef}
                                    autoFocus={true}
                                    style={styles.textInputPlayer}
                                    maxLength={10}
                                    placeholder='Ajouter un joueur ..'
                                    placeholderTextColor={"#fff"}
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
                            textAlign: 'center',
                            fontSize: wp("8%"), fontFamily: "MainTitle"
                        }} buttonStyle={{
                            backgroundColor: "#D42A2A",
                            borderRadius: wp("3%"), width: wp("70%"),
                            marginLeft: wp("3%"),
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
        flex: 0.6
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.2,
        alignItems: 'center'
    },
    middle: {
        flex: 0.68,
    },
    bottom: {
        flex: 0.12,
        alignItems: 'center',
    },
    messageView: {
        marginTop: wp("1%"),
        paddingHorizontal: wp("10%"),
        height: wp("40%"),
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        marginTop: wp("10%"),
        paddingHorizontal: wp("11%"),
        height: wp("40%")
    },
    title: {
        marginTop: wp("7%"),
        paddingRight: wp("5%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("7%"),
        fontFamily: "titre",
    },
    title_captain: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("14%"),
        fontFamily: "TheTitle",
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
    message: {
        marginTop: wp("3%"),
        fontSize: wp("6%"),
        color: '#fff',
        fontFamily: 'questionText',
        marginBottom: wp("4.5%"),
        textAlign: 'center',
    },
    addInputButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp("11%"),
        padding: wp("2%"),
        marginTop: wp("8%"),
    },
    textInputPlayer: {
        color: 'white',
        fontSize: wp("6%"),
        fontFamily: 'ABeeZee-Regular',
    },
    col3: {
        width: "20%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    col4: {
        width: "33%",
        justifyContent: 'center',
        alignItems: 'center',
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
