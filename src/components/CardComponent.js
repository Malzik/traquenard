import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import {FormattedText} from "./helpers/FormattedText";
import {handleAndroidBackButton, removeAndroidBackButtonHandler} from "./helpers/BackHandlerHelper";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
            cards: [
                {type: "duels", color: "#D42A2A", scene: "Duel", selectPlayer: true, text: "text.game.duel"},
                {
                    type: "friendships",
                    color: "#2A9BDA",
                    scene: "FriendShip",
                    selectPlayer: true,
                    text: "text.game.friendship"
                },
                {type: "questions", color: "#FFE332", scene: "Question", text: "text.game.question"},
                {
                    type: "everyone",
                    color: "#3FBD4E",
                    scene: "OneVersusAll",
                    selectCategory: true,
                    text: "text.game.oneversusall"
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
            <View style={styles.container}>
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
                                    fontSize: 40, fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: card.color,
                                    borderRadius: 10
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
    },
    header: {
        flex: 0.3,
    },
    content: {
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    duoQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    randomIcon: {
        padding: 10,
        alignItems: 'center',
    },
    cards: {
        width: "50%",
        paddingHorizontal: 20,
        marginBottom: 10
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
