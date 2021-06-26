import * as Font                                           from "expo-font";
import AsyncStorage                                        from "@react-native-async-storage/async-storage";
import { Provider }                                        from "react-redux";
import { store }                                                                           from "./src/store/store";
import { ActivityIndicator, Alert, BackHandler, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React                                                                               from "react";
import { Button }                                          from "react-native-elements";
import { widthPercentageToDP as wp }                       from "react-native-responsive-screen";
import { NavigationContainer }                             from "@react-navigation/native";
import { Tutorial }                                        from "./src/components/TutorialComponent";
import { SelectPlayer }               from "./src/components/SelectPlayerComponent";
import { SelectDifficulty }           from "./src/components/SelectDifficultyComponent";
import { Card }                       from "./src/components/CardComponent";
import { SelectOtherPlayer }          from "./src/components/SelectOtherPlayerComponent";
import { SelectCategoryOneVersusAll } from "./src/components/SelectCategoryOneVersusAllComponent";
import { All }                        from "./src/components/AllComponent";
import { Question }                   from "./src/components/QuestionComponent";
import { AnswerQuestion }             from "./src/components/AnswerQuestionComponent";
import { EveryonePlay }               from "./src/components/EveryonePlayComponent";
import { WinLoose }                   from "./src/components/WinLooseComponent";
import { EndGame }                    from "./src/components/EndGameComponent";
import { createStackNavigator }       from "@react-navigation/stack";
import { ApplicationText }            from "./src/components/helpers/ApplicationText";

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
        // AsyncStorage.removeItem('isFirstGame')
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
        Alert.alert(ApplicationText("text.alert.title"),
            ApplicationText("text.alert.content"),
            [
                {
                    text: ApplicationText("text.alert.ok"),
                    onPress: () => this.setState({alert: false, playButton: false})
                },
                {text: ApplicationText("text.alert.close"), onPress: () => {
                        this.setState({playButton: true});
                        BackHandler.exitApp()
                    }}
            ],
            {cancelable: false})
    }

    renderPlayerButton() {
        return (
            <View style={styles.container}>
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
                            title={ApplicationText("text.play")}
                            onPress={() => this.alert()}
                    />
                </View>
            </View>
        )
    }

    renderAlert() {
        this.alert()
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={require('./assets/logo_captain.png')} />
                </View>
            </View>
        )
    }

    renderFontNotLoaded() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating = {true}
                    color = '#bc2b78'
                    size = "large"/>
                <Text style={styles.text}>
                    {ApplicationText('text.loading')}
                </Text>
            </View>
        );
    }

    renderFontLoaded() {
        const { startPage } = this.state;
        return (
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
        );
    }

    handlerRender() {
        const {playButton, fontIsLoaded, alert} = this.state;
        if(playButton) {
            return this.renderPlayerButton()
        }
        if(!fontIsLoaded) {
            return this.renderFontNotLoaded()
        }
        if(alert) {
            return this.renderAlert()
        }
        return this.renderFontLoaded()
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar hidden={true}/>
                {this.handlerRender()}
            </Provider>
        )
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