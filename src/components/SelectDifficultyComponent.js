import React, {useState} from "react";
import {Text, StyleSheet, View, Button} from "react-native";
import { ScreenOrientation } from 'expo';
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";


class SelectDifficultyComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    setDifficulty(difficulty){
        this.props.changeDifficulty(difficulty);
    }


    render() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Choisir la difficulté </Text>
                </View>
                <View style={ styles.content }>
                    <Button title="Panaché" onPress={() => {
                        this.setDifficulty(1);
                    }} />
                    <Button title="Bière" onPress={() => {
                        this.setDifficulty(2);
                    }} />
                    <Button title="Vin" onPress={() => {
                        this.setDifficulty(3);
                    }} />
                    <Button title="Vodka" onPress={() => {
                        this.setDifficulty(4);
                    }} />
                    <Button title="Absinthe" onPress={() => {
                        this.setDifficulty(5);
                    }} />
                </View>
            </View>

        );
    }
}

SelectDifficultyComponent.propTypes = {
    changeDifficulty: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header: {
        height: 80,
        padding: 38,
        backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});


const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const SelectDifficulty = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectDifficultyComponent);

export { SelectDifficulty, SelectDifficultyComponent };

