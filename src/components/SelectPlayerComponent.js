import React from "react";
import {Text, StyleSheet, View, Button, TextInput} from "react-native";
import { Input } from 'react-native-elements';

class SelectPlayerComponent extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <View style={{ flex: 0.66, backgroundColor: 'red' }}>
                    <Input value="" placeholder="Enter email"/>
                    <Input valye="" placeholder="Enter password"/>
                </View>
                <View style={{ flex: 0.33, backgroundColor: 'green' }}>
                    <Button title="Login" backgroundColor="red" onPress={console.log(this)}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SelectPlayerComponent;
