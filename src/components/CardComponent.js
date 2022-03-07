import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Alert,
    Modal,
    FlatList, NativeModules
} from "react-native";
import {bindActionCreators}                                      from "redux";
import * as gameActions                                          from "../store/actions/gameAction";
import PropTypes                                                 from "prop-types";
import {connect}                                                 from "react-redux";
import {FormattedText}                                           from "./helpers/FormattedText";
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from "./helpers/BackHandlerHelper";
import {widthPercentageToDP as wp}                               from "react-native-responsive-screen";
import { EndGamePlayer }                                         from "./EndGamePlayerComponent";
import { ApplicationText }                                       from "./helpers/ApplicationText";
import {showInterstitialAds} from "./helpers/YodoHelper";


class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pubOpen: false,
            cards: [
                {
                    type: "duels",
                    color: "#D47431",
                    scene: "Duel",
                    selectPlayer: true,
                    text: "text.game.duels",
                    pts: require('./icons/3.png'),
                    desc: "text.game.duels.description",
                    points: 3
                },
                {
                    type: "friendships",
                    color: "#2A9BDA",
                    scene: "FriendShip",
                    selectPlayer: true,
                    text: "text.game.friendships",
                    pts: require('./icons/3.png'),
                    desc: "text.game.friendships.description",
                    points: 3
                },
                {
                    type: "questions",
                    color: "#3FBD4E",
                    scene: "Question",
                    text: "text.game.questions",
                    pts: require('./icons/2.png'),
                    desc: "text.game.questions.description",
                    points: 2
                },
                {
                    type: "oneversusall",
                    color: "#D42A2A",
                    scene: "OneVersusAll",
                    selectCategory: true,
                    text: "text.game.oneversusall",
                    pts: require('./icons/5.png'),
                    desc: "text.game.oneversusall.description",
                    points: 5
                },
            ],
            modalVisible: false
        };

    }

    componentDidMount(): void {
        const {textReducer} = this.props;
        handleAndroidBackButton(textReducer);

    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        this.isEndGame()
    }

    changeScene(card) {
        const {navigation} = this.props;

        if (card.selectPlayer) {
            navigation.navigate("SelectOtherPlayer", {card});
        } else if (card.selectCategory) {
            navigation.navigate("SelectCategory", {card});
        } else {
            navigation.navigate(card.scene, {card});
        }
    }

    isEndGame() {
        const {navigation, gameReducer} = this.props;

        if (gameReducer.currentTurn >= gameReducer.maxTurn) {
            if (this.state.pubOpen === false) {
                showInterstitialAds()
                this.setState({pubOpen: true})
            }
            navigation.navigate("EndGame")
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    sortPlayer() {
        const {players} = this.props.gameReducer;
        const sortedPlayers = players.slice()

        sortedPlayers.sort((a, b) => (a.points - b.points))

        const length = sortedPlayers.length;
        const winner = sortedPlayers[length-1]

        sortedPlayers.forEach((player, index) => {
            if (player.points === winner.points) {
                player.position = 1
            } else {
                player.position = length - index;
            }
        })

        return sortedPlayers;
    }

    render() {
        const {texts} = this.props.textReducer;
        const {cards} = this.state;
        const { modalVisible } = this.state;
        const players = this.sortPlayer();

        return (
            <View style={styles.container}
                  onLayout={this.onLayout}>

                <Modal
                    animationType="fade"
                    transparent={true}
                    supportedOrientations={['portrait', 'landscape']}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View>
                        <View style={styles.modalView}>
                            <View style={ styles.headRow }>
                                <View style={ styles.headRowID }>
                                    <Text  style={ styles.textHead }>{ApplicationText("text.leaderboard.index")}</Text>
                                </View>
                                <View style={ styles.headRowName }>
                                    <Text  style={ styles.textHead }>{ApplicationText("text.leaderboard.username")}</Text>
                                </View>
                                <View style={ styles.headRowPoints }>
                                    <Text  style={ styles.textHead }>{ApplicationText("text.leaderboard.points")}</Text>
                                </View>
                            </View>

                            <View style={styles.list}>
                                <FlatList
                                    ref={el => this.flatList = el}
                                    inverted
                                    data={players}
                                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true, offset: 0})}
                                    onLayout={() => this.flatList.scrollToEnd({animated: true, offset: 0 })}
                                    renderItem={({item, index}) => (
                                        <EndGamePlayer time={0} item={item} />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View style={styles.alignBtn}>
                                <TouchableHighlight
                                    style={{ ...styles.openButton, backgroundColor: "#D42A2A" }}
                                    onPress={() => {
                                        this.setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>{ApplicationText("text.alert.close")}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>



                <View style={styles.header}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.card.title"]}/>
                    </Text>
                    <TouchableOpacity onPress={() => { this.setModalVisible(!modalVisible)}}>
                        <Text style={styles.nbPts}>
                            {ApplicationText("text.card.points")}<FormattedText text={"points"} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {
                        cards.map((card, index) => {
                            if (index !== 1 && index !== 3)
                                return <View style={styles.cards} id={index} key={index}>
                                    <TouchableOpacity onPress={() => this.changeScene(card)}>
                                        <View style={{
                                            backgroundColor: card.color,
                                            borderRadius: wp("3%"),
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: "space-between"
                                            }}>
                                                <View style={{
                                                    width: "80%"
                                                }}>
                                                    <Text style={styles.textCard}>{texts[card.text]}</Text>
                                                </View>
                                                <View style={{
                                                    padding: wp("3%"),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: "20%"
                                                }}>
                                                    <Image source={card.pts}
                                                           style={{
                                                               width: wp("12%"),
                                                               height: wp("12%"),
                                                           }}/>
                                                </View>

                                            </View>
                                            <View>
                                                <Text style={styles.textDesc}>{ApplicationText(card.desc)}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            else
                                return <View style={styles.cards} id={index} key={index}>
                                    <TouchableOpacity onPress={() => this.changeScene(card)}>
                                        <View style={{
                                            backgroundColor: card.color,
                                            borderRadius: wp("3%"),
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: "space-between",

                                            }}>
                                                <View style={{
                                                    padding: wp("3%"),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: "20%"
                                                }}>
                                                    <Image source={card.pts}
                                                           style={{
                                                               width: wp("12%"),
                                                               height: wp("12%"),
                                                           }}/>
                                                </View>
                                                <View style={{
                                                    width: "80%"
                                                }}>
                                                    <Text style={styles.textCardLeft}>{texts[card.text]}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={styles.textDesc}>{ApplicationText(card.desc)}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                        })
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        flexDirection: 'column'
    },
    header: {
        height: wp('30%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        height: wp('70%'),
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    title: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("9%"),
        fontFamily: "titre",
        marginLeft: wp("5%")
    },
    nbPts:{
        marginTop: wp("5%"),
        textAlign: 'center',
        color: '#fff',
        padding: wp("3%"),
        fontSize: wp("6%"),
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 6,
        fontFamily: "titre",
        marginRight: wp("5%"),
        height: wp("15%"),
    },
    cards: {
        width: "50%",
        paddingHorizontal: wp("5%"),
        marginBottom: wp("5%")
    },
    textCard: {
        color: '#fff',
        fontSize: wp("9%"),
        paddingTop: wp("4%"),
        paddingLeft: wp("4%"),
        fontFamily: "MainTitle"
    },
    textCardLeft: {
        color: '#fff',
        fontSize: wp("9%"),
        paddingTop: wp("4%"),
        paddingRight: wp("4%"),
        fontFamily: "MainTitle",
        textAlign: 'right'
    },
    textDesc: {
        color: '#fff',
        fontSize: wp("4%"),
        fontFamily: "gorgeesText",
        padding: wp("2%"),
    },


    modalView: {
        margin: 15,
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
    alignBtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    openButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: wp("50%"),
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    headRow:{
        flexDirection: 'row',
        borderBottomColor: 'white',
        paddingBottom: wp('1%'),
        borderBottomWidth: 3,
        marginBottom:  wp('5%'),
    },
    textHead: {
        fontSize: wp('7%'),
        color: '#fff',
        fontFamily: 'titre',
        textAlign: 'center',
    },
    textTable: {
        fontSize: wp('6%'),
        color: '#fff',
        fontFamily: 'gorgeesText',
        textAlign: 'center',
    },
    headRowID: {
        flex:0.3
    },
    headRowName: {
        flex:0.4
    },
    headRowPoints: {
        flex:0.3
    },
    list: {
        maxHeight: wp("35%"),
        marginBottom:  wp('10%'),
    },


});


CardComponent.propTypes = {
    changeScene: PropTypes.func,
    updateCurrentUser: PropTypes.func
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Card = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardComponent);

export { Card, CardComponent };
