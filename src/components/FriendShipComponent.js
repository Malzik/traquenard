import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";

class FriendShipComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
            friendship: {
                question: null,
                sip: null
            }
        };
    }

    componentDidMount(): void {
        const {textReducer, removeQuestion} = this.props;

        const friendships = textReducer.friendships;
        const friendship = friendships[Math.floor(Math.random() * friendships.length)];
        this.setState({
            friendship
        });
        removeQuestion("friendships", friendship);
    }

    changeScene(): void {
        const {navigation, addSip} = this.props;
        const {friendship} = this.state;

        addSip(friendship.sip);
        navigation.navigate("EveryonePlay")
    }

    render() {
        const {texts} = this.props.textReducer;
        const {question, sip} = this.state.friendship;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.friendship.title"]}/>
                    </Text>
                </View>
                <View style={styles.flex2}>
                    <Text style={styles.questionText}>{question}</Text>
                </View>
                <View style={styles.flex3}>
                    <Text style={styles.sipText}>
                        <FormattedText text={texts["text.sip"]} sip={sip}/>
                    </Text>
                </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A9BDA',
    },
    flex1: {
        flex: 0.2,
        padding: 10,
    },
    flex2: {
        flex: 0.6,
        justifyContent: 'center',
        marginBottom: 10,
    },
    flex3: {
        flex: 0.2,
        marginRight: 30
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
    },
    sipText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
    }
});

FriendShipComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const FriendShip = connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendShipComponent);

export { FriendShip, FriendShipComponent };
