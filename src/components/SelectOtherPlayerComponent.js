import {Button, Picker, StyleSheet, Text, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {Duel} from "./DuelComponent";
import {FriendShip} from "./FriendShipComponent";

class SelectOtherPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
            currentPlayer: null,
            selectedPlayer: null
        };
        this.setState({
            currentPlayer: this.props.currentPlayer
        })
    }

    componentWillMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        })
    }

    changeSelectedPlayer() {
        this.props.updateSelectedPlayer(this.state.selectedPlayer)
    }

    renderSelectPlayer() {
        return (
            <View style={ styles.container }>
                <View>
                    <Text style={ styles.title }> {this.state.currentPlayer.name} choisi avec qui tu veux jouer </Text>
                </View>
                <View style={ styles.content }>
                    <Picker
                        selectedValue={this.state.language}
                        style={{height: 50, width: 100}}
                        onValueChange={itemValue => this.setState({selectedPlayer: itemValue})}>
                        <Picker.Item label="Selectionnez un joueur" value={1} enabled={false}/>
                        {
                            this.props.gameReducer.players.map((player, index) => {
                                if (this.state.currentPlayer.name !== player.name)
                                    return <Picker.Item label={player.name} value={player.name}/>
                            })
                        }
                    </Picker>
                    <Button onPress={() => this.changeSelectedPlayer()} title={"To " + this.state.game}/>
                </View>
            </View>
        );
    }

    renderGame() {
        switch (this.state.game) {
            case "duel":
                return <Duel currentPlayer={this.state.currentPlayer} selectedPlayer={this.state.selectedPlayer}/>;
            case "friendship":
                return <FriendShip currentPlayer={this.state.currentPlayer} selectedPlayer={this.state.selectedPlayer}/>
        }
    }

    render() {
        return this.state.selectedPlayer !== null ? this.renderGame() : this.renderSelectPlayer();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    content: {
        flex: 0.7,
        alignItems: 'center',
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
});


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const SelectOtherPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectOtherPlayerComponent);

export {SelectOtherPlayer, SelectOtherPlayerComponent};
