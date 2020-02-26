import {Text} from "react-native";
import { connect } from 'react-redux';
import React from "react";
import { Duel } from "./DuelComponent";
import {Card} from "./CardComponent";
import {View} from "react-native";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {Question} from "./QuestionComponent";
import {FriendShip} from "./FriendShipComponent";
import {Luck} from "./LuckComponent";

class GameManagerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    randomScene() {
        const number = Math.floor(Math.random() * 4) + 1;
        switch (number) {
            case 1:
                return <Duel/>
            case 2:
                return <Question/>
            case 3:
                return <FriendShip/>
            case 4:
                return <Luck/>
        }
    }

    render() {
        const sceneToDisplayed = () => {
            switch (this.props.gameReducer.scene) {
                case "duel":
                    return <Duel />;
                case "question":
                    return <Question />;
                case "friendship":
                    return <FriendShip />;
                case "luck":
                    return <Luck />;
                case "random":
                    return this.randomScene();
                case "card":
                    return <Card />;
                default:
                    return <Card />;
            }
        };

        return (
            <View>{ sceneToDisplayed() }</View>
        );
    }
}
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const GameManager = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameManagerComponent);

export { GameManager, GameManagerComponent };
