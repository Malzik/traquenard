import React from 'react';
import {StatusBar, Text} from "react-native";
import {Provider} from 'react-redux'
import {store} from './src/store/store';
import {SelectPlayer} from "./src/components/SelectPlayerComponent";
import {Card} from "./src/components/CardComponent";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectDifficulty}           from "./src/components/SelectDifficultyComponent";
import {EndGame}                    from "./src/components/EndGameComponent";
import {SelectOtherPlayer}          from "./src/components/SelectOtherPlayerComponent";
import {Question}                   from "./src/components/QuestionComponent";
import {AnswerQuestion}             from "./src/components/AnswerQuestionComponent";
import {EveryonePlay}               from "./src/components/EveryonePlayComponent";
import * as Font                    from 'expo-font'
import {SelectCategoryOneVersusAll} from "./src/components/SelectCategoryOneVersusAllComponent";
import { WinLoose }                 from "./src/components/WinLooseComponent";
import { All }                      from "./src/components/AllComponent";
import { Tutorial }                 from "./src/components/TutorialComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontIsLoaded: false,
            startPage: 'SelectPlayer'
        };
        // AsyncStorage.removeItem('tutorial')
    }

    async componentDidMount(): void {
        await this.getStorageData();
        await Font.loadAsync({
            'MainTitle': require('./assets/fonts/RAPIDSQUAD.otf'),
            'ABeeZee-Regular': require('./assets/fonts/ABeeZee-Regular.ttf'),
            'titre': require('./assets/fonts/Qualy_Bold.ttf'),
            'questionText': require('./assets/fonts/OpenSans-Regular.ttf'),
            'gorgeesText': require('./assets/fonts/OpenSans-LightItalic.ttf')
        });

        this.setState({fontIsLoaded: true})
    }

    async getStorageData() {
        try {
            await AsyncStorage.getItem('tutorial').then(response => {
                if (response !== 'true') {
                    this.setState({
                        startPage: 'Tutorial'
                    })
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    renderFontLoaded() {
        const { startPage } = this.state;
        return (
            <Provider store={store}>
                <StatusBar hidden={true}/>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName={startPage}
                        headerMode={"none"}
                        gestureEnabled={true}
                    >
                        <Stack.Screen name="Tutorial" component={Tutorial}/>
                        <Stack.Screen name="SelectPlayer" component={SelectPlayer}/>
                        <Stack.Screen name="SelectDifficulty" component={SelectDifficulty}/>
                        <Stack.Screen name="Card" component={Card} gesturesEnabled={false}/>
                        <Stack.Screen name="SelectOtherPlayer" component={SelectOtherPlayer}/>
                        <Stack.Screen name="SelectCategory" component={SelectCategoryOneVersusAll}/>
                        <Stack.Screen name="All" component={All}/>
                        <Stack.Screen name="Question" component={Question}/>
                        <Stack.Screen name="AnswerQuestion" component={AnswerQuestion}/>
                        <Stack.Screen name="EveryonePlay" component={EveryonePlay}/>
                        <Stack.Screen name="WinLoose" component={WinLoose}/>
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
