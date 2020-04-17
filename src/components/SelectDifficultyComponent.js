import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {lockAsync, OrientationLock} from "expo-screen-orientation";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedText} from "./helpers/FormattedText";


class SelectDifficultyComponent extends React.Component {

    constructor(props) {
        super(props);

        let textCollection = {};
        textCollection["text.chooseDifficulty.title"] = this.props.gameReducer.texts["text.chooseDifficulty.title"];

        this.state = {
            texts: textCollection
        }
    }

    setDifficulty(difficulty){
        this.props.changeDifficulty(difficulty);
        this.props.updateCurrentUser();
        this.props.navigation.navigate('GameManager')
    }


    render() {
        const {texts} = this.state;
        lockAsync(OrientationLock.LANDSCAPE_LEFT);

        return (
            <View style={ styles.container }>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.chooseDifficulty.title"]}/>
                    </Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => this.setDifficulty(1)}>
                        <Image source={require('./icons/img1.png')} style={{width: 100, height: 100}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(2)}>
                        <Image source={require('./icons/img1.png')} style={{width: 100, height: 100}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(3)}>
                        <Image source={require('./icons/img1.png')} style={{width: 100, height: 100}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(4)}>
                        <Image source={require('./icons/img1.png')} style={{width: 100, height: 100}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(5)}>
                        <Image source={require('./icons/img1.png')} style={{width: 100, height: 100}}/>
                    </TouchableOpacity>
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
        backgroundColor: '#2A2A2A',
    },
    header: {
        flex: 0.1,
    },
    content: {
        flex: 0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
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
