import React                                                                               from 'react';
import { ActivityIndicator, Alert, BackHandler, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import {Provider}                                                                          from 'react-redux'
import {store} from './src/store/store';
import {SelectPlayer} from "./src/components/SelectPlayerComponent";
import {Card} from "./src/components/CardComponent";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SelectDifficulty}           from "./src/components/SelectDifficultyComponent";
import {EndGame}                                                                           from "./src/components/EndGameComponent";
import {SelectOtherPlayer}                                                                 from "./src/components/SelectOtherPlayerComponent";
import {Question}                                                                          from "./src/components/QuestionComponent";
import {AnswerQuestion}                                                                    from "./src/components/AnswerQuestionComponent";
import {EveryonePlay}                                                                      from "./src/components/EveryonePlayComponent";
import * as Font                                                                           from 'expo-font'
import {SelectCategoryOneVersusAll}                                                        from "./src/components/SelectCategoryOneVersusAllComponent";
import { WinLoose }                                                                        from "./src/components/WinLooseComponent";
import { All }                                                                             from "./src/components/AllComponent";
import { Tutorial }                                                                        from "./src/components/TutorialComponent";
import AsyncStorage                                                                        from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp }                                                       from "react-native-responsive-screen";
import {Button} from "react-native-elements";

const Stack = createStackNavigator();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontIsLoaded: false,
            startPage: 'SelectPlayer',
            alert: true,
            playButton: false
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
            'gorgeesText': require('./assets/fonts/OpenSans-LightItalic.ttf'),
            'TheTitle': require('./assets/fonts/Designero.ttf')
        });

        this.setState({fontIsLoaded: true})
    }

    async getStorageData() {
        try {
            await AsyncStorage.getItem('tutorial').then(response => {
                if (response !== 'true') {
                    this.setState({
                        startPage: 'Tutorial'
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    alert() {
        Alert.alert("Attention !",
            "L'abus d'alcool est dangereux pour la santé. En poursuivant vous confirmez être responsable des éventuelles conséquences que pourrait engendrer l'utilisation de Captain Gnole",
            [
                {
                    text: 'OK',
                    onPress: () => this.setState({alert: false, playButton: false})
                },
                {text: 'FERMER', onPress: () => {
                        this.setState({playButton: true});
                        BackHandler.exitApp()
                    }}
            ],
            {cancelable: false})
    }

    renderPlayerButton() {
        return (<View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('./assets/logo_captain.png')} />
            </View>
            <View style={styles.middle}>
                <Button titleStyle={{
                    textAlign: 'center', fontSize: wp("8%")
                }} buttonStyle={{
                    backgroundColor: "#D42A2A",
                    borderRadius: wp("3%"), width: wp("70%"),
                    marginLeft: wp("3%"),
                }}
                        title="Jouer"
                        onPress={() => this.alert()}
                />
            </View>
        </View>)
    }

    renderAlert()
    {
        this.alert()
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('./assets/logo_captain.png')} />
                </View>
            </View>
        )
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
            <View style={styles.container}>
                <ActivityIndicator
                    animating = {true}
                    color = '#bc2b78'
                    size = "large"/>
                <Text style={styles.text}>Please wait !</Text>
            </View>
        );
    }

    render() {
        if(this.state.playButton) {
            return this.renderPlayerButton()
        }
        if(!this.state.fontIsLoaded) {
            return this.renderFontNotLoaded()
        }
        if(this.state.alert) {
            return this.renderAlert()
        }
        return this.renderFontLoaded()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0BA77',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 0.6,
    },
    middle: {
        flex: 0.2,
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("7.5%"),
    }
})

export default App;
