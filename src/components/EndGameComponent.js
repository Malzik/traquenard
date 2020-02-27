import React, {useState} from "react";
import {Text, StyleSheet, View, Button, FlatList} from "react-native";
import { Input } from 'react-native-elements';


class EndGameComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    restart(){
        this.props.restart();
        this.props.navigation.navigate('SelectPlayer');
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Traquenard </Text>
                </View>
                <View style={ styles.content }>
                    <Button title="Fin de la partie" onPress={() => {
                        this.restart();
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

});

export default SelectPlayerComponent;
