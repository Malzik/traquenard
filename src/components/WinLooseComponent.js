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
            <View>
                <View>
                    <TouchableOpacity style={styles.loose} onPress={() => this.changeScene(this.LOOSE)}>
                        <Text>LOOSE</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.win} onPress={() => this.changeScene(this.WIN)}>
                        <Text>WIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loose :{
        height: wp('50%'),
        justifyContent: 'center',
        backgroundColor: '#D42A2A',
    },
    win :{
        height: wp('50%'),
        justifyContent: 'center',
        backgroundColor: '#3FBD4E',
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
