import {Button, Text, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";

class EveryonePlayComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <Text>Everyone</Text>
                <Button onPress={() => this.props.changeScene("card")} title={"To Card"}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const EveryonePlay = connect(
    mapStateToProps,
    mapDispatchToProps
)(EveryonePlayComponent);

export {EveryonePlay, EveryonePlayComponent};
