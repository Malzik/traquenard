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
import { NativeModules }              from "react-native";
import { changeLang }                 from "./src/store/actions/textAction";
// const { Yodo1MASAds } = NativeModules;
//
// Yodo1MASAds.initMasSdk()
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
            await AsyncStorage.multiGet(['tutorial', 'lang']).then(response => {
                if (response[0][0] === "tutorial") {
                    if (response[0][1] !== 'true') {
                        this.setState({
                            startPage: 'Tutorial'
                        });
                    }
                }
                if (response[1][0] === "lang") {
                    let lang = response[1][1]
                    if (lang === null) {
                        const deviceLang = this.getDeviceLanguage()
                        lang = deviceLang.split('_')[0];
                        AsyncStorage.setItem("lang", lang)
                    }
                    store.dispatch(changeLang(lang))
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    getDeviceLanguage() {
        return Platform.OS === 'ios'
                ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
                : NativeModules.I18nManager.localeIdentifier;
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
                    gestureEnabled={true}
                >
                    <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false}}/>
                    <Stack.Screen name="SelectPlayer" component={SelectPlayer} options={{ headerShown: false}}/>
                    <Stack.Screen name="SelectDifficulty" component={SelectDifficulty} options={{ headerShown: false}}/>
                    <Stack.Screen name="Card" component={Card} gesturesEnabled={false} options={{ headerShown: false}}/>
                    <Stack.Screen name="SelectOtherPlayer" component={SelectOtherPlayer} options={{ headerShown: false}}/>
                    <Stack.Screen name="SelectCategory" component={SelectCategoryOneVersusAll} options={{ headerShown: false}}/>
                    <Stack.Screen name="All" component={All} options={{ headerShown: false}}/>
                    <Stack.Screen name="Question" component={Question} options={{ headerShown: false}}/>
                    <Stack.Screen name="AnswerQuestion" component={AnswerQuestion} options={{ headerShown: false}}/>
                    <Stack.Screen name="EveryonePlay" component={EveryonePlay} options={{ headerShown: false}}/>
                    <Stack.Screen name="WinLoose" component={WinLoose} options={{ headerShown: false}}/>
                    <Stack.Screen name="EndGame" component={EndGame} options={{ headerShown: false}}/>
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
        backgroundColor: '#2A2A2A',
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