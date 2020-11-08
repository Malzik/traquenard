import {StyleSheet, TouchableOpacity, View, Text} from "react-native";
import React                                      from "react";
import {bindActionCreators}                       from "redux";
import {connect}                                  from "react-redux";
import * as gameActions                           from "../store/actions/gameAction";
import { widthPercentageToDP as wp }              from "react-native-responsive-screen";
import { DuelComponent }                          from "./DuelComponent";
import { FriendShipComponent }                    from "./FriendShipComponent";
import { QuestionComponent }                      from "./QuestionComponent";
import { OneVersusAllComponent }                  from "./OneVersusAllComponent";

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

    changeScene(win): void {
        const {navigation, addPoints, addPointsDuel, addPointsFriendship} = this.props;
        const { points, type } = this.state;
        switch (type) {
            case DuelComponent.TYPE:
                addPointsDuel(points, win);
                break;
            case FriendShipComponent.TYPE:
                addPointsFriendship(points, win);
                break;
            case QuestionComponent.TYPE:
            case OneVersusAllComponent.TYPE:
                addPoints(points, win);
                break;
        }

        navigation.navigate("EveryonePlay")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.col1}>
                        <Text style={styles.textGame}>Duel</Text>
                    </View>
                    <View style={styles.col2}>
                        <Text style={styles.textMain}>John tu as ?</Text>
                    </View>
                    <View style={styles.col3}>
                        <Text style={styles.textPts}>3 PTS</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.loose} onPress={() => this.changeScene(this.LOOSE)}>
                        <Text style={styles.textLoose}>Perdu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.win} onPress={() => this.changeScene(this.WIN)}>
                        <Text style={styles.textWin}>Gagné</Text>
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
        flexDirection: 'row',
        borderBottomColor: "#FFF",
        borderBottomWidth: 2
    },
    content: {
        flex: 0.8,
        flexDirection: 'row',
    },
    col1: {
        flex: 0.33
    },
    col2: {
        flex: 0.33
    },
    col3: {
        flex: 0.33
    },
    loose :{
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: '#D42A2A',
        borderRightColor: "#FFF",
        borderRightWidth: 1,
    },
    win :{
        flex: 0.5,
        justifyContent: 'center',
        backgroundColor: '#3FBD4E',
        borderLeftColor: "#FFF",
        borderLeftWidth: 1
    },
    textGame: {
        marginTop: wp("4%"),
        paddingLeft: wp("4%"),
        color: '#fff',
        fontSize: wp("9%"),
        fontFamily: "titre",
    },
    textPts: {
        marginTop: wp("4%"),
        paddingRight: wp("4%"),
        color: '#fff',
        textAlign: 'right',
        fontSize: wp("9%"),
        fontFamily: "titre",
    },
    textMain: {
        marginTop: wp("3%"),
        color: '#fff',
        textAlign: 'center',
        fontSize: wp("10%"),
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
