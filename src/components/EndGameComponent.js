import React                                       from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import {Button}                                    from 'react-native-elements';
import {bindActionCreators}                        from "redux";
import * as gameActions                            from "../store/actions/gameAction";
import {connect}                                   from "react-redux";
import * as ScreenOrientation                      from 'expo-screen-orientation';
import {widthPercentageToDP as wp}                 from "react-native-responsive-screen";
import { EndGamePlayer }                  from "./EndGamePlayerComponent";
import { getStorageData, setStorageData } from "./helpers/GetFromStore";
import Rate, {AndroidMarket} from "react-native-rate";

class EndGameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDate: []
        }
    }

    rating() {
        getStorageData('isFirstGame').then(response => {
            if (response === null) {
                Alert.alert("Tu aimes le jeu ?",
                    "Mets-nous 5 étoiles ! ⭐⭐⭐⭐⭐",
                    [
                        {
                            text: 'C\'est parti !',
                            onPress: () => this.rate()
                        },
                        {
                            text: 'Plus tard',
                            onPress: () => {
                                this.restart()
                            }
                        }
                    ],
                    {cancelable: false})
            } else {
                this.restart()
            }
        })
    }

    restart() {
        const { restartGame } = this.props;
        setStorageData("isFirstGame", "false").then(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'SelectPlayer' }],
            });
            restartGame();
        })
    }

    rate() {
        const options = {
            AppleAppID:"2193813192",
            GooglePackageName:"com.traquenard.corp",
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp:false,
            openAppStoreIfInAppFails:true,
        }
        Rate.rate(options, success=>{
            if (success) {
                setStorageData("isFirstGame", "false").then(() => {
                    this.restart()
                })
            }
        })
    }

    sortPlayer() {
        const {players} = this.props.gameReducer;

        players.sort((a, b) => (a.points - b.points))

        const length = players.length;
        const winner = players[length-1]

        players.forEach((player, index) => {
            if (player.points === winner.points) {
                player.position = 1
            } else {
                player.position = length - index;
            }
        })

        return players;
    }

    render() {
        const players = this.sortPlayer();
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Fin de la partie </Text>
                </View>
                <View style={ styles.middle }>
                    <View>
                        <View style={ styles.headRow }>
                            <View style={ styles.headRowID }>
                                <Text  style={ styles.textHead }> Place </Text>
                            </View>
                            <View style={ styles.headRowName }>
                                <Text  style={ styles.textHead }> Nom </Text>
                            </View>
                            <View style={ styles.headRowPoints }>
                                <Text  style={ styles.textHead }> Points </Text>
                            </View>
                        </View>


                        <View style={styles.list}>
                            <FlatList
                                ref={el => this.flatList = el}
                                inverted
                                data={players}
                                onContentSizeChange={() => this.flatList.scrollToEnd({animated: true, offset: 0})}
                                onLayout={() => this.flatList.scrollToEnd({animated: true, offset: 0 })}
                                renderItem={({item, index}) => (
                                    <EndGamePlayer time={index * 2500} item={item} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    </View>
                </View>
                <View style={ styles.bottom }>
                    <Button titleStyle={{textAlign: 'center', color: '#fff',
                        fontSize: wp('10%'),  fontFamily: "MainTitle"
                    }} buttonStyle={{ backgroundColor: "#DA2A2A",
                        borderRadius: 60, width: wp('50%'), }}
                            title="Rejouer" onPress={() => { this.rating();
                    }}/>
                </View>
            </View>
        );
    }

    onLayout() {
        this.list.scrollToOffset({ animated: true, offset: 0 });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    header: {
        height: "20%",
    },
    middle: {
        height: "55%",
        paddingHorizontal: "6%"
    },
    bottom: {
        height: "25%",
        alignItems: 'center',
    },
    title: {
        marginTop: wp('10%'),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp('11%'),
        fontFamily: "titre"
    },
    headRow:{
        flexDirection: 'row',
        borderBottomColor: 'white',
        paddingBottom: wp('1%'),
        borderBottomWidth: 3,
    },
    row:{
        flexDirection: 'row',
        marginTop: wp('3%'),
        paddingBottom: wp('3%'),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    textHead: {
        fontSize: wp('7%'),
        color: '#fff',
        fontFamily: 'titre',
        textAlign: 'center',
    },
    textTable: {
        fontSize: wp('6%'),
        color: '#fff',
        fontFamily: 'gorgeesText',
        textAlign: 'center',
    },
    headRowID: {
        flex:0.3
    },
    headRowName: {
        flex:0.4
    },
    headRowPoints: {
        flex:0.3
    },
    list: {
        maxHeight: wp("85%")
    },
});

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const EndGame = connect(
    mapStateToProps,
    mapDispatchToProps
)(EndGameComponent);

export {EndGame, EndGameComponent};
