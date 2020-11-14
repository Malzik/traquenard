import React                              from "react";
import {bindActionCreators}               from "redux";
import {connect}                          from "react-redux";
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage                       from '@react-native-async-storage/async-storage';
import tutorial                           from '../../assets/tutorial';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as ScreenOrientation from 'expo-screen-orientation';


class TutorialComponent extends React.Component {
    constructor(props) {
        super(props);

        const tutorials = Object.values(tutorial)
        this.state = {
            tutorials,
            currentTutorial: tutorials.find(tutorial => tutorial.position === 0),
            index: 0,
            end: false,
            images: {
                screen1: require('./icons/card_tuto.jpg'),
                screen2: require('./icons/card_tuto.jpg'),
                screen3: require('./icons/win_loose_tuto.jpg'),
                screen4: require('./icons/regle_tuto.jpg'),
            }
        }

        this.changeScene = this.changeScene.bind(this);
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

    renderBackButton() {
        const { index } = this.state;

        if (index > 0) {
            return (
                <TouchableOpacity onPress={() => this.back()}>
                    <Image source={require('./icons/back.png')}
                           style={{width: wp("15%"), height: wp("15%")}}/>
                </TouchableOpacity>
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
            <TouchableOpacity onPress={() => this.next()}>
                <Image source={require('./icons/next.png')}
                       style={{width: wp("15%"), height: wp("15%")}}/>
            </TouchableOpacity>
        )
    }

    render() {
        const { currentTutorial } = this.state;

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        return (
            <View style={styles.container}>
                <View style={styles.backButton}>
                    {this.renderBackButton()}
                </View>
                <View style={styles.content}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.textTitle}>{currentTutorial.title}</Text>
                    </View>
                    <View style={styles.viewContent}>
                        <Text style={styles.textCard}>{currentTutorial.text}</Text>
                        <Text style={styles.textCard}>{currentTutorial.text2}</Text>
                    </View>
                    <View style={styles.imgView}>
                        <Image source={this.state.images[currentTutorial.name]}
                               style={{
                                   width: wp("100%"),
                                   height: wp("50%"),
                               }}/>
                    </View>
                </View>
                <View style={styles.nextButton}>
                    {this.renderNextButton()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        flexDirection: 'row'
    },
    content : {
        flex: 0.7,
        flexDirection: 'column',
        alignItems: "center",
        marginTop: wp("3%"),
    },
    viewTitle: {
        flex: 0.15,
    },
    viewContent: {
        flex: 0.20,
        width: wp("135%"),
    },
    imgView: {
        flex: 0.55,
        marginTop: wp("4%"),
        padding: wp("4%"),
        borderWidth: 1,
        borderColor: "#FFF",
        borderRadius: 6,
    },
    backButton: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    nextButton: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "titre",
    },
    textCard: {
        color: '#fff',
        textAlign: 'center',
        fontSize: wp("5%"),
        fontFamily: "questionText",
    },
});


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
