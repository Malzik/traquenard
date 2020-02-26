import {Text} from "react-native";
import React from "react";
import DuelComponent from "./DuelComponent";
import CardComponent from "./CardComponent";
import {View} from "react-native";

class GameManagerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);

        this.state = {
            scene: ""
        }
    }

    clickHandler(newScene) {
        this.setState({
            scene: newScene
        });
    }

    render() {
        const sceneToDisplayed = () => {
            switch (this.state.scene) {
                case "duel":
                    return <DuelComponent action = {this.clickHandler}/>;
                case "card":
                    return <CardComponent action = {this.clickHandler}/>;
                default:
                    return <CardComponent action = {this.clickHandler}/>;
            }
        };

        return (
            <View>{ sceneToDisplayed() }</View>
        );
    }
}

export default GameManagerComponent;
