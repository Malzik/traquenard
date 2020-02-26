import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameManagerComponent from "./src/components/GameManagerComponent";
import SelectPlayerComponent from "./src/components/SelectPlayerComponent";

class App extends React.Component {
  render() {
    return (
        <GameManagerComponent />
    );
  }
}

export default App;
