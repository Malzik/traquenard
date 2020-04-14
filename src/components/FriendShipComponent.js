import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

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
        const friendships = this.props.gameReducer.friendships;
        const friendship = friendships[Math.floor(Math.random() * friendships.length)];
        this.setState({
            friendship
        })
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.changeScene("everyoneplay")}>
                    <View>
                        <Text style={styles.title}> Amitié
                            : {this.state.currentPlayer.name} vs {this.state.selectedPlayer.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.questionText}>{this.state.friendship.question}</Text>
                    </View>
                    <View>
                        <Text style={styles.gorgeesText}>{this.state.friendship.sip} gorgées en jeu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A9BDA',
        justifyContent: 'space-between',
    },
    title: {
        padding: 10,
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        padding: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
        marginBottom: 20,
    },
    gorgeesText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
        padding: 10,
    }
});

FriendShipComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const FriendShip = connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendShipComponent);

export { FriendShip, FriendShipComponent };
