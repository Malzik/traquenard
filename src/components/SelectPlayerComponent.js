import React, {useState} from "react";
import {Text, StyleSheet, View, Button, FlatList} from "react-native";
import { Input } from 'react-native-elements';


class SelectPlayerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players: [
                {name: 'Jean', sipCount : 0, sipGiven : 0},
                {name: 'Rene', sipCount : 0, sipGiven : 0},
                {name: 'Bebe', sipCount : 0, sipGiven : 0},
            ],
            currentPlayer: ""
        }
    }

    addPlayer(){
        const newPlayer = {name: this.state.currentPlayer, sipCount : 0, sipGiven : 0};
        this.setState({
            players: [...this.state.players, newPlayer],
            currentPlayer:""
        })
    }

    removePlayer(index){
        console.log(index);
        this.setState({
            players: this.state.players.filter(function (item,stateIndex){return index !== stateIndex} )
        })
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Traquenard </Text>
                </View>
                <View style={ styles.content }>
                    <View style={ styles.list }>
                        <FlatList
                            data={this.state.players}
                            renderItem={({ item, index }) => (
                                <View style={ styles.player }>
                                    <Text>{item.name}</Text>
                                    <Button title="Supp" onPress={() => {
                                        this.removePlayer(index);
                                    }} />
                                </View>

                            )}
                        />
                    </View>
                    <Input
                        placeholder='Ajouter un joueur'
                        onChangeText={(text) => this.setState({currentPlayer:text})}
                        value={this.state.currentPlayer}
                    />
                    <Button title="Solid Button" onPress={() => {
                        this.addPlayer();
                    }} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
    },
    list: {
        marginTop: 20,
    },
    header: {
        height: 80,
        padding: 38,
        backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    player: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default SelectPlayerComponent;
