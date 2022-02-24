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
    ToastAndroid,
    Alert,
    Modal,
    Linking,
    NativeModules
} from "react-native";
import {Button}                    from 'react-native-elements';
import PropTypes                   from "prop-types";
import {bindActionCreators}        from "redux";
import * as gameActions            from "../store/actions/gameAction";
import * as textActions            from "../store/actions/textAction";
import {connect}                   from "react-redux";
import * as ScreenOrientation      from 'expo-screen-orientation';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import AsyncStorage                from "@react-native-async-storage/async-storage";
import {getMaxTurn}            from "../store/reducers/gameReducer";
import Rate, { AndroidMarket } from "react-native-rate";

const { Yodo1MASAds } = NativeModules;


import texts from '../../assets/texts/fr';
import {ApplicationText} from "./helpers/ApplicationText";
import {SelectDifficultyComponent} from "./SelectDifficultyComponent";


class SelectPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            players: [].reverse(),
            currentPlayer: "",
            modalVisible: false,
            maxTurnPlayer: 0,
            maxTurnSystem: getMaxTurn([]),
            languages: "fr"
        };
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    async componentDidMount() {
        await this.getStorageData()
        this.focusInputWithKeyboard()
    }

    getMaxTurnPlayer() {
        if (this.state.maxTurnPlayer === 0) {
            return this.state.maxTurnSystem;
        }
        return this.state.maxTurnPlayer;
    }

    addOneTurn() {
        if (this.state.maxTurnPlayer < 10) {
            this.setState({maxTurnPlayer: this.getMaxTurnPlayer() + 1})
        }
    }

    removeOneTurn() {
        if (this.state.maxTurnPlayer > 1) {
            this.setState({maxTurnPlayer: this.getMaxTurnPlayer() - 1})
        }
    }

    changeLang(lang) {
        const {changeLang} = this.props;
        if (lang === "fr") {
            changeLang("fr");
        } else if (lang === "en") {
            changeLang("en");
        } else {
            changeLang("fr");
        }
        this.setLang(lang)
    }

    async setLang(lang) {
        await AsyncStorage.setItem("lang", lang)
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
            ApplicationText("text.selectPlayer.playSamePlayerPopUp"),
            [
                {
                    text: ApplicationText("text.selectPlayer.yesBtnPopUp"),
                    onPress: () => {
                        this.setState({players: JSON.parse(players)})
                        InteractionManager.runAfterInteractions(() => {
                            this.inputRef.current.blur()
                        });
                    }
                },
                {
                    text: ApplicationText("text.selectPlayer.noBtnPopUp"),
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
                this.showToast(ApplicationText("text.selectPlayer.sameNameError"))
                return;
            }
            const newPlayer = {name: this.state.currentPlayer, points: 0};
            this.setState({
                players: [newPlayer, ...this.state.players],
                currentPlayer: "",
                errors: {...this.state.errors, addPlayer: ""},
                maxTurnSystem: getMaxTurn(this.state.players.length)
            })
        } else {
            this.showToast(ApplicationText("text.selectPlayer.emptyNameError"))
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
            addPlayers(this.state.players, getMaxTurn());
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

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    message(){
        if (this.state.players.length < 1){
            return(
                <View style={styles.messageView}>
                    <Image source={require('./icons/info.png')}
                           style={{width: wp("9%"), height: wp("9%")}}/>
                    <Text style={styles.message}>{ApplicationText("text.selectPlayer.addTwoPlayerLib")}</Text>
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

    renderEvaluationAlert() {
        Alert.alert(ApplicationText("text.selectPlayer.evaluationTitle"),
            ApplicationText("text.selectPlayer.evaluationMessage"),
            [
                {
                    text: ApplicationText("text.selectPlayer.evaluationBtnYes"),
                    onPress: () => this.rate()
                },
                {
                    text: ApplicationText("text.selectPlayer.evaluationBtnNo")
                }
            ],
            {cancelable: true})
    }

    rate() {
        const options = {
            AppleAppID:"2193813192",
            GooglePackageName:"com.thetraquenard.corpo",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:false,
            openAppStoreIfInAppFails:true,
        }
        Rate.rate(options)
    }

    renderFrFlag(lang) {
        if (lang === "fr") {
            return (
                <TouchableOpacity onPress={() => {this.changeLang("fr");}}>
                    <Image source={require('./icons/france.png')} style={{width: 80, height: 80}}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {this.changeLang("fr");}}>
                    <Image source={require('./icons/france.png')} style={{width: 50, height: 50, opacity: .7}}/>
                </TouchableOpacity>
            )
        }
    }

    renderEnFlag(lang) {
        if (lang === "en") {
            return (
                <TouchableOpacity onPress={() => { this.changeLang("en");}}>
                    <Image source={require('./icons/united-kingdom.png')} style={{width: 80, height: 80}}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => { this.changeLang("en");}}>
                    <Image source={require('./icons/united-kingdom.png')} style={{width: 50, height: 50, opacity: .7}}/>
                </TouchableOpacity>
            )
        }
    }

    render() {
        const { modalVisible } = this.state;
        const { language } = this.props.textReducer;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false)
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.headerModal}>
                                <Text style={styles.titleOption}>{ApplicationText("text.selectPlayer.modalOptionTitle")}</Text>
                                <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible);}}  style={{padding: 2}}>
                                    <Image  source={require('./icons/cancel.png')} style={{width: 30, height: 30}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentModal}>
                                <View style={styles.displayLine}>
                                    {this.renderFrFlag(language)}
                                    {this.renderEnFlag(language)}
                                </View>
                                <View style={styles.marginBot}>
                                    <View style={styles.roundView}>
                                        <Text style={styles.textModal}>{ApplicationText("text.selectPlayer.modalOptionRound")}</Text>
                                    </View>
                                    <View style={styles.displayLine}>
                                        <TouchableOpacity onPress={() => this.removeOneTurn()}>
                                            <Image source={require('./icons/back.png')} style={{width: 40, height: 40}}/>
                                        </TouchableOpacity>
                                        <Text style={styles.numberText}>{this.getMaxTurnPlayer()}</Text>
                                        <TouchableOpacity onPress={() => this.addOneTurn()}>
                                            <Image source={require('./icons/next.png')} style={{width: 40, height: 40}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.bottomModal}>
                                <TouchableOpacity style={styles.viewCenter} onPress={() => this.renderEvaluationAlert()}>
                                    <Image source={require('./icons/love.png')} style={{width: 40, height: 40, marginBottom: 5}}/>
                                    <Text style={styles.textIcon}>{ApplicationText("text.selectPlayer.modalOptionMark")}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewCenter} onPress={
                                    () => Linking.openURL('mailto:traquenard.contact@gmail.com?subject=Traquenard')
                                }>
                                    <Image source={require('./icons/email.png')} style={{width: 40, height: 40, marginBottom: 5}}/>
                                    <Text style={styles.textIcon}>{ApplicationText("text.selectPlayer.modalOptionContact")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.header}>
                        <Text style={styles.title_captain}> TRAQUENARD </Text>
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
                                    placeholder={ApplicationText("text.selectPlayer.addPlayerPlaceholder")}
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
                        <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible)}}>
                            <View style={{
                                backgroundColor: "#2A9BDA",
                                borderRadius: wp("3%"),
                                padding: wp("3%"),
                                marginRight: wp("3%"),
                            }}>
                                <Image source={require('./icons/reglages.png')}
                                       style={{width: 30, height: 30}}/>
                            </View>
                        </TouchableOpacity>

                        <Button titleStyle={{
                            textAlign: 'center',
                            fontSize: wp("8%"), fontFamily: "MainTitle"
                        }} buttonStyle={{
                            backgroundColor: "#D42A2A",
                            borderRadius: wp("3%"), width: wp("55%"),
                            marginLeft: wp("3%"),
                        }}
                                title={ApplicationText("text.selectPlayer.startGameBtn")}
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
        flex: 0.6,
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
        flexDirection: 'row',
        justifyContent: 'center'
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
    titleOption: {
        paddingRight: wp("5%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("9%"),
        fontFamily: "titre",
    },
    title_captain: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("12%"),
        fontFamily: "MainTitle",
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
    },
    modalView: {
        flex: 0.8,
        margin: 15,
        marginTop: wp("20%"),
        backgroundColor: "#2A2A2A",
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerModal: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    contentModal: {
        flex: 0.7,
        marginTop: wp("10%"),
        marginBottom: wp("15%"),
    },
    displayLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    textModal: {
        fontSize: wp("8%"),
        color: '#fff',
        fontFamily: 'titre',
    },
    numberText: {
        fontSize: wp("15%"),
        color: '#fff',
        fontFamily: 'titre',
    },
    roundView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: wp("5%")
    },
    bottomModal: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    viewCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textIcon: {
        fontSize: wp("4%"),
        color: '#fff',
        fontFamily: 'titre',
    },
    marginBot: {
        marginTop: wp("15%")
    }
});


SelectPlayerComponent.propTypes = {
    changeScene: PropTypes.func,
    addPlayers: PropTypes.func,
    changeLang: PropTypes.func,
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
