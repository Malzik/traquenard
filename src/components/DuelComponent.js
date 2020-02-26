import {Button, Text} from "react-native";
import React from "react";

class DuelComponent extends React.Component {
    render() {

        return (
            <Button onPress = {() => this.props.action("card")} title={"To Card"}/>
        );
    }
}

export default DuelComponent;
