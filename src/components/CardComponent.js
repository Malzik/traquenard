import {Text, Button, View} from "react-native";
import PropTypes from 'prop-types';
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button onPress = {() => this.props.changeScene("duel")} title={"Duel"}/>
                <Button onPress = {() => this.props.changeScene("question")} title={"Question"}/>
                <Button onPress = {() => this.props.changeScene("friendship")} title={"Amitié"}/>
                <Button onPress = {() => this.props.changeScene("luck")} title={"T'as pas de couille"}/>
                <Button onPress = {() => this.props.changeScene("random")} title={"Aleatoire"}/>
            </View>
        );
    }
}
CardComponent.propTypes = {
    changeScene: PropTypes.func,
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Card = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardComponent);

export { Card, CardComponent };
