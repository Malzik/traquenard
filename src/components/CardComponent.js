import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import {FormattedText} from "./helpers/FormattedText";
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from "./helpers/BackHandlerHelper";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
            cards: [
                {
                    type: "duels",
                    color: "#D42A2A",
                    scene: "Duel",
                    selectPlayer: true,
                    text: "text.game.duel",
                    img: "./icons/Duel.png"
                },
                {
                    type: "friendships",
                    color: "#2A9BDA",
                    scene: "FriendShip",
                    selectPlayer: true,
                    text: "text.game.friendship",
                    img: "./icons/Friend.png"
                },
                {
                    type: "questions",
                    color: "#FFE332",
                    scene: "Question",
                    text: "text.game.question",
                    img: "./icons/Question.png"
                },
                {
                    type: "everyone",
                    color: "#3FBD4E",
                    scene: "OneVersusAll",
                    selectCategory: true,
                    text: "text.game.oneversusall",
                    img: "./icons/OneVersusAll.png"
                },
            ],
        };

    }

    componentDidMount(): void {
        handleAndroidBackButton(this.props.textReducer);
    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
    }

    checkIfQuestionRemaining(card) {
        const {textReducer} = this.props;

        return !textReducer[card.type].length > 0;
    }

    changeScene(card) {
        const {navigation} = this.props;

        if (card.selectPlayer) {
            navigation.navigate("SelectOtherPlayer", {component: card.scene});
        } else if (card.selectCategory) {
            navigation.navigate("SelectCategory", {component: card.scene});
        } else {
            navigation.navigate(card.scene);
        }
    }

    render() {
        const {texts} = this.props.textReducer;
        const {cards} = this.state;

        return (
            <View style={styles.container}
                  onLayout={this.onLayout}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.card.title"]}/>
                    </Text>
                </View>
                <View style={styles.content}>
                    {
                        cards.map((card, index) => {
                            return <View style={styles.cards} id={index} key={index}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: wp("12%"), fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: card.color,
                                    borderRadius: wp("3%")
                                }}
                                        title={texts[card.text]}
                                        onPress={() => this.changeScene(card)}
                                        disabled={this.checkIfQuestionRemaining(card)}
                                />
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
        fontFamily: "titre"
    },
    cards: {
        width: "50%",
        paddingHorizontal: wp("5%"),
        marginBottom: wp("5%")
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
