import {Button, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class LuckComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View>
                <Text>Luck</Text>
            <Button onPress = {() => this.props.changeScene("card")} title={"To Card"}/>
            </View>
        );
    }
}

LuckComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Luck = connect(
    mapStateToProps,
    mapDispatchToProps
)(LuckComponent);

export { Luck, LuckComponent };
