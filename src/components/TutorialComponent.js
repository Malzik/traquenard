import React                              from "react";
import {bindActionCreators}               from "redux";
import {connect}                          from "react-redux";
import { Button, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage                       from '@react-native-async-storage/async-storage';
import tutorial                           from '../../assets/tutorial';


class TutorialComponent extends React.Component {
    constructor(props) {
        super(props);

        const tutorials = Object.values(tutorial)
        this.state = {
            tutorials,
            currentTutorial: tutorials.find(tutorial => tutorial.position === 0),
            index: 0,
            end: false
        }

        this.changeScene = this.changeScene.bind(this);
    }

    back() {
        const { index, end } = this.state;

        const newIndex = index - 1;

        if (end) {
            setTimeout(() => {
                this.setState({
                    end: false
                })
            }, 50)
        }
        this.changeTutorial(newIndex)
    }

    next() {
        const { index, end} = this.state;

        const newIndex = index + 1;
        if (end) {
            this.changeScene()
        } else {
            this.changeTutorial(newIndex)
        }
    }

    changeTutorial(newIndex) {
        let { end, tutorials } = this.state;

        let newEnd = false;

        const tutorial = tutorials.find(tutorial => tutorial.position === newIndex);

        if (tutorial.end && end === false) {
            newEnd = true;
        }
        setTimeout(() => {
            this.setState({
                end: newEnd,
                index: newIndex,
                currentTutorial: tutorial
            })
        }, 50)

    }

    async changeScene() {
        const {navigation} = this.props;

        await AsyncStorage.setItem("tutorial", "true").then(() => {
            navigation.navigate("SelectPlayer")
        })
    }

    renderBackButton() {
        const { index } = this.state;

        if (index > 0) {
            return (
                <Button title={"back"} onPress={() => this.back()}/>
            )
        }
    }

    renderNextButton() {
        const { end } = this.state;

        let text = "next";
        if (end) {
            text = "end"
        }
        return (
            <Button title={text} onPress={() => this.next()}/>
        )
    }

    render() {
        const { currentTutorial } = this.state;

        return (
            <View onPress={() => this.changeTutorial()}>
                {this.renderBackButton()}
                <Text>{currentTutorial.title}</Text>
                <Text>{currentTutorial.text}</Text>
                {this.renderNextButton()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({}, dispatch);

const Tutorial = connect(
    mapStateToProps,
    mapDispatchToProps
)(TutorialComponent);

export {Tutorial, TutorialComponent};
