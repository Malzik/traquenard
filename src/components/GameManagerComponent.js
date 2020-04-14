import {View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import {Duel} from "./DuelComponent";
import {Card} from "./CardComponent";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {Question} from "./QuestionComponent";
import {FriendShip} from "./FriendShipComponent";
import {EveryonePlay} from "./EveryonePlayComponent";
import {SelectOtherPlayer} from "./SelectOtherPlayerComponent";
import {SelectCategoryOneVersusAll} from "./SelectCategoryOneVersusAllComponent";

class GameManagerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            info: props.gameReducer,
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        }
    }

    randomScene() {
        const number = Math.floor(Math.random() * 4) + 1;
        switch (number) {
            case 1:
                return <Duel/>;
            case 2:
                return <Question/>;
            case 3:
                return <FriendShip/>;
            case 4:
                return <Luck/>
        }
    }

    endGame() {
        this.props.navigation.navigate('EndGame')
    }

    render() {
        if (this.props.gameReducer.currentTurn >= this.props.gameReducer.maxTurn) {
            this.endGame();
        }
        const sceneToDisplayed = () => {
            switch (this.props.gameReducer.scene) {
                case "duel":
                    return <SelectOtherPlayer game="duel" currentPlayer={this.state.currentPlayer}/>;
                case "question":
                    return <Question/>;
                case "friendship":
                    return <SelectOtherPlayer game="friendship" currentPlayer={this.state.currentPlayer}/>;
                case "oneversusall":
                    return <SelectCategoryOneVersusAll currentPlayer={this.state.currentPlayer}/>;
                case "random":
                    return this.randomScene();
                case "everyoneplay":
                    return <EveryonePlay/>;
                case "card":
                    return <Card/>;
                default:
                    return <Card/>;
            }
        };
        return (
            <View style={{flex: 1}}>{sceneToDisplayed()}</View>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const GameManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameManagerComponent);

export { GameManager, GameManagerComponent };
