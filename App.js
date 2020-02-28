import React from 'react';
import {StatusBar, Text} from "react-native";
import {GameManager} from "./src/components/GameManagerComponent";
import {Provider} from 'react-redux'
import {store} from './src/store/store';
import {SelectPlayer} from "./src/components/SelectPlayerComponent";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectDifficulty} from "./src/components/SelectDifficultyComponent";
import {EndGame} from "./src/components/EndGameComponent";
import * as Font from 'expo-font'

const Stack = createStackNavigator();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontIsLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Pacifico': require('./assets/fonts/Pacifico.ttf')
        });

        this.setState({fontIsLoaded: true})
    }

    renderFontLoaded() {
        return (
            <Provider store={store}>
                <StatusBar hidden={true}/>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SelectPlayer" headerMode={"none"}>
                        <Stack.Screen name="SelectPlayer" component={SelectPlayer}/>
                        <Stack.Screen name="SelectDifficulty" component={SelectDifficulty}/>
                        <Stack.Screen name="GameManager" component={GameManager}/>
                        <Stack.Screen name="EndGame" component={EndGame}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }

    renderFontNotLoaded() {
        return (
            <Text>Font Not Loaded</Text>
        );
    }

    render() {
        return this.state.fontIsLoaded ? this.renderFontLoaded() : this.renderFontNotLoaded()
    }
}

export default App;
