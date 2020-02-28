import {Button, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class FriendShipComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
        };
        console.log(this.state)
    }
    render() {

        return (
            <View>
                <Text>FriendShip</Text>
                <Text>{this.state.currentPlayer.name} joue avec {this.state.selectedPlayer}</Text>
                <Button onPress={() => this.props.changeScene("everyoneplay")} title={"To Everyone"}/>
            </View>
        );
    }
}

FriendShipComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const FriendShip = connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendShipComponent);

export { FriendShip, FriendShipComponent };
