import {Button, Picker, Text, View} from "react-native";
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
        return (<View>
            <Text>{this.state.currentPlayer.name} va choisir avec qui jouer</Text>
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
        </View>);
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
