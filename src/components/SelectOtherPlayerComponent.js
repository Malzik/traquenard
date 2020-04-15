import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {Duel} from "./DuelComponent";
import {FriendShip} from "./FriendShipComponent";
import {FormattedText} from "./helpers/FormattedText";

class SelectOtherPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        let textCollection = {};
        textCollection["text.selectOtherPlayer.title"] = this.props.gameReducer.texts["text.selectOtherPlayer.title"];

        this.state = {
            currentPlayer: {
                name: null
            },
            game: null,
            selectedPlayer: null,
            texts: textCollection
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer],
            game: this.props.game
        })
    }

    changeSelectedPlayer(player) {
        this.props.updateSelectedPlayer(player);
        this.setState({selectedPlayer: player});
    }

    renderSelectPlayer() {
        const {texts} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.selectOtherPlayer.title"]}/>
                    </Text>
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={this.props.gameReducer.players}
                        renderItem={({item}, index) => {
                            if (this.state.currentPlayer.name !== item.name) {
                                return <TouchableOpacity onPress={() => this.changeSelectedPlayer(item)}>
                                    <View style={styles.playerView}>
                                        <Text style={styles.playerText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
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
        flex:0.3,
    },
    listView: {
        flex:0.7,
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
