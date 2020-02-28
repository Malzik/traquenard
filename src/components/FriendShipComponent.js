import {Button, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class FriendShipComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View>
                <Text>FriendShip</Text>
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
