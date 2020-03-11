import React from 'react';
import {StatusBar, Text, SafeAreaView, TabBarIOS} from "react-native";
import {GameManager} from "./src/components/GameManagerComponent";
import {Provider} from 'react-redux'
import {store} from './src/store/store';
import {SelectPlayer} from "./src/components/SelectPlayerComponent";
import {Card} from "./src/components/CardComponent";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectDifficulty} from "./src/components/SelectDifficultyComponent";
import {EndGame} from "./src/components/EndGameComponent";
import {Duel} from "./src/components/DuelComponent";
import {FriendShip} from "./src/components/FriendShipComponent";
import {SelectOtherPlayer} from "./src/components/SelectOtherPlayerComponent";
import {Luck} from "./src/components/LuckComponent";
import {Question} from "./src/components/QuestionComponent";
import {EveryonePlay} from "./src/components/EveryonePlayComponent";
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
            'MainTitle': require('./assets/fonts/BlackRyderDemo.ttf'),
            'ABeeZee-Regular': require('./assets/fonts/ABeeZee-Regular.ttf'),
            'titre': require('./assets/fonts/OpenSans-Semibold.ttf'),
            'questionText': require('./assets/fonts/OpenSans-Regular.ttf'),
            'gorgeesText': require('./assets/fonts/OpenSans-LightItalic.ttf')
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
                        <Stack.Screen name="Card" component={Card}/>
                        <Stack.Screen name="SelectOtherPlayer" component={SelectOtherPlayer}/>
                        <Stack.Screen name="Duel" component={Duel}/>
                        <Stack.Screen name="FriendShip" component={FriendShip}/>
                        <Stack.Screen name="Luck" component={Luck}/>
                        <Stack.Screen name="Question" component={Question}/>
                        <Stack.Screen name="EveryonePlay" component={EveryonePlay}/>
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
