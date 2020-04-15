import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';

class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
            cards: [
                {name: 'Duel', color: "#D42A2A", scene: "duel"},
                {name: 'Amitié', color: "#2A9BDA", scene: "friendship"},
                {name: 'Question', color: "#FFE332", scene: "question"},
                {name: 'Seul Contre Tous', color: "#3FBD4E", scene: "oneversusall"},
            ],
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text style={ styles.title }> {this.props.currentPlayer} à toi de jouer !</Text>
                </View>
                <View style={ styles.content }>
                    {
                        this.state.cards.map(card => {
                            return <View style={styles.cards}>
                                <Button titleStyle={{textAlign: 'center', color: '#fff',
                                    fontSize: 40,  fontFamily: "MainTitle"
                                }} buttonStyle={{ backgroundColor: card.color,
                                    borderRadius: 10}}
                                        title={card.name}
                                        onPress={() => this.props.changeScene(card.scene)}
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
