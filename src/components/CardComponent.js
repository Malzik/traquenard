import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedText} from "./helpers/FormattedText";
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from "./helpers/BackHandlerHelper";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {
                    type: "duels",
                    color: "#D47431",
                    scene: "Duel",
                    selectPlayer: true,
                    text: "text.game.duels",
                    pts: require('./icons/3.png'),
                    desc: "Defi contre un autre joueur de ton choix",
                    points: 3
                },
                {
                    type: "friendships",
                    color: "#2A9BDA",
                    scene: "FriendShip",
                    selectPlayer: true,
                    text: "text.game.friendships",
                    pts: require('./icons/3.png'),
                    desc: "Defi avec un autre joueur de ton choix",
                    points: 3
                },
                {
                    type: "questions",
                    color: "#3FBD4E",
                    scene: "Question",
                    text: "text.game.questions",
                    pts: require('./icons/2.png'),
                    desc: "Question de culture générale",
                    points: 2
                },
                {
                    type: "oneversusall",
                    color: "#D42A2A",
                    scene: "OneVersusAll",
                    selectCategory: true,
                    text: "text.game.oneversusall",
                    pts: require('./icons/5.png'),
                    desc: "Tu es seul contre le reste des joueur",
                    points: 5
                },
            ],
        };

    }

    componentDidMount(): void {
        const {textReducer} = this.props;
        handleAndroidBackButton(textReducer);

    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
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
            navigation.navigate("EndGame");
        }
    }

    render() {
        const {texts} = this.props.textReducer;
        const {cards} = this.state;

        this.isEndGame()
        return (
            <View style={styles.container}
                  onLayout={this.onLayout}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.card.title"]}/>
                    </Text>
                    <Text style={styles.nbPts}>
                        Points : <FormattedText text={"points"} />
                    </Text>
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
                                                <Text style={styles.textDesc}>{card.desc}</Text>
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
                                                <Text style={styles.textDesc}>{card.desc}</Text>
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
        fontSize: wp("10%"),
        fontFamily: "titre",
        marginLeft: wp("5%")
    },
    nbPts:{
        marginTop: wp("5%"),
        textAlign: 'center',
        color: '#fff',
        padding: wp("3%"),
        fontSize: wp("7%"),
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
    }
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
