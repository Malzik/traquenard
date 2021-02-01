import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React                                      from "react";
import {bindActionCreators}                       from "redux";
import {connect}                                  from "react-redux";
import * as gameActions                           from "../store/actions/gameAction";
import { widthPercentageToDP as wp }              from "react-native-responsive-screen";
import { AllComponent }                           from "./AllComponent";
import {FormattedText} from "./helpers/FormattedText";
import {ApplicationText} from "./helpers/ApplicationText";

class WinLooseComponent extends React.Component {
    WIN = true;
    LOOSE = false;

    constructor(props) {
        super(props);

        const {points, type} = this.props.route.params;

        this.state = {
            points,
            type
        }
    }

    changeScene(win) {
        const {navigation, addPoints, addPointsDuel, addPointsFriendship, gameReducer, updateCurrentUser} = this.props;
        const { points, type } = this.state;
        switch (type) {
            case AllComponent.DUEL:
                addPointsDuel(points, win);
                break;
            case AllComponent.FRIENDSHIP:
                addPointsFriendship(points, win);
                break;
            case AllComponent.ONEVERSUSALL:
            case AllComponent.QUESTION:
                addPoints(points, win);
                break;
        }

        if (gameReducer.showEveryone) {
            navigation.navigate("EveryonePlay")
        } else {
            updateCurrentUser();
            navigation.navigate("Card")
        }
    }
    changeSceneEquality() {
        const {navigation, gameReducer, updateCurrentUser} = this.props;

        if (gameReducer.showEveryone) {
            navigation.navigate("EveryonePlay")
        } else {
            updateCurrentUser();
            navigation.navigate("Card")
        }
    }

    render() {
        const {texts} = this.props.textReducer;
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.col1}>
                        <Text style={styles.textGame}>
                            {texts['text.game.' + this.state.type]}
                        </Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.textMain}>
                            <FormattedText text={texts['text.winLoose.currentPlayer']}/>
                        </Text>
                    </View>
                    <View style={styles.col3}>
                        <Text style={styles.textPts}> {this.state.points} {ApplicationText("text.winLoose.points")}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.loose} onPress={() => this.changeScene(this.LOOSE)}>
                        <Text style={styles.textLoose}>{ApplicationText("text.winLoose.loose")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.equality} onPress={() => this.changeSceneEquality()}>
                        <Text style={styles.textLoose}>{ApplicationText("text.winLoose.equality")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.win} onPress={() => this.changeScene(this.WIN)}>
                        <Text style={styles.textWin}>{ApplicationText("text.winLoose.win")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    head: {
        flex: 0.2,
        marginTop: wp("2%"),
        flexDirection: 'row',
        borderBottomColor: "#FFF",
        borderBottomWidth: 2
    },
    content: {
        flex: 0.8,
        flexDirection: 'row',
    },
    col1: {
        flex: 0.3
    },
    col2: {
        flex: 0.4
    },
    col3: {
        flex: 0.3
    },
    loose :{
        flex: 0.34,
        justifyContent: 'center',
        backgroundColor: '#D42A2A',
        borderRightColor: "#FFF",
        borderRightWidth: 1,
    },
    equality :{
        flex: 0.32,
        justifyContent: 'center',
        backgroundColor: '#2A2A2A',
        borderLeftColor: "#FFF",
        borderLeftWidth: 1
    },
    win :{
        flex: 0.34,
        justifyContent: 'center',
        backgroundColor: '#3FBD4E',
        borderLeftColor: "#FFF",
        borderLeftWidth: 1
    },
    textGame: {
        marginTop: wp("4%"),
        paddingLeft: wp("4%"),
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "titre",
    },
    textPts: {
        marginTop: wp("4%"),
        paddingRight: wp("4%"),
        color: '#fff',
        textAlign: 'right',
        fontSize: wp("8%"),
        fontFamily: "titre",
    },
    textMain: {
        marginTop: wp("3%"),
        color: '#fff',
        textAlign: 'center',
        fontSize: wp("9%"),
        fontFamily: "MainTitle"
    },
    textWin: {
        color: '#fff',
        textAlign: 'center',
        fontSize: wp("15%"),
        fontFamily: "MainTitle"
    },
    textLoose: {
        color: '#fff',
        textAlign: 'center',
        fontSize: wp("15%"),
        fontFamily: "MainTitle"
    },
});

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions }, dispatch);

const WinLoose = connect(
    mapStateToProps,
    mapDispatchToProps
)(WinLooseComponent);

export { WinLoose, WinLooseComponent };
