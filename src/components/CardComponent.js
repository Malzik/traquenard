import {Text, Button, View} from "react-native";
import React from "react";

class CardComponent extends React.Component {
    render() {
        return (
            <Button onPress = {() => this.props.action("duel")} title={"To Duel"}/>
        );
    }
}

export default CardComponent;
