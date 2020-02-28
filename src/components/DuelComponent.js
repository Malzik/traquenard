import {Button, Text, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class DuelComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View>
                <Text>Duel</Text>
                <Button onPress={() => this.props.changeScene("everyoneplay")} title={"To Everyone"}/>
            </View>
        );
    }
}

DuelComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Duel = connect(
    mapStateToProps,
    mapDispatchToProps
)(DuelComponent);

export { Duel, DuelComponent };
