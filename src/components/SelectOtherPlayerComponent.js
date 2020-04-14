import {Button, Picker, StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity, Image} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {Duel} from "./DuelComponent";
import {FriendShip} from "./FriendShipComponent";

class SelectOtherPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer],
            game: this.props.game,
            selectedPlayer: null
        })
    }

    changeSelectedPlayer(player) {
        this.setState({selectedPlayer: player});
        this.props.updateSelectedPlayer(this.state.selectedPlayer);
    }

    renderSelectPlayer() {
        console.log(1);
        return (
            <View style={ styles.container }>
                <View style={ styles.titleView }>
                    <Text style={ styles.title }> {this.state.currentPlayer.name} choisi avec qui tu veux jouer </Text>
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={this.props.gameReducer.players}
                        renderItem={({item}) => {
                            if (this.state.currentPlayer.name !== item.name) {
                               return <TouchableOpacity onPress={() => this.changeSelectedPlayer(item)}>
                                    <View style={styles.playerView}>
                                        <Text style={styles.playerText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        }}
                    />
                </View>
            </View>
        );
    }

    renderGame() {
        switch (this.state.game) {
            case "duel":
                return <Duel currentPlayer={this.state.currentPlayer} selectedPlayer={this.state.selectedPlayer}/>;
            case "friendship":
                return <FriendShip currentPlayer={this.state.currentPlayer} selectedPlayer={this.state.selectedPlayer}/>
        }
    }

    render() {
        return this.state.selectedPlayer !== null ? this.renderGame() : this.renderSelectPlayer();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    titleView: {
        flex:0.2,
    },
    listView: {
        flex:0.8,
        justifyContent:'center',
        paddingHorizontal: 100,
        marginBottom: 30
    },
    playerView: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#2A9BDA',
        borderRadius:50,
    },
    playerText:{
        flex:1,
        height:60,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: "MainTitle",
        color: "#fff"
    }
});


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const SelectOtherPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectOtherPlayerComponent);

export {SelectOtherPlayer, SelectOtherPlayerComponent};
