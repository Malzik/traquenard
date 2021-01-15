import React                                                       from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Button}                                                    from 'react-native-elements';
import {bindActionCreators}                                        from "redux";
import * as gameActions                                            from "../store/actions/gameAction";
import {connect}                                                   from "react-redux";
import * as ScreenOrientation from 'expo-screen-orientation';
import moment                                                      from "moment";
import {widthPercentageToDP as wp}     from "react-native-responsive-screen";
import { EndGamePlayer }                                           from "./EndGamePlayerComponent";


class EndGameComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tableDate: []
        }
    }

    componentDidMount() {
        const {gameReducer} = this.props;
        const currentDate = moment(new Date());
        const duration = currentDate.diff(gameReducer.startTime, 'minutes');

        this.setState({
            duration,
            tableData: [
                ['Durée', duration + ' minutes'],
                ['Gorgées distribuées', "TODO"],
                ['Nombre de tour', gameReducer.currentTurn]
            ],
        })
    }

    restart() {
        this.props.restartGame();
        this.props.navigation.navigate('SelectPlayer');
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
        const players = this.sortPlayer()
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
                            title="Rejouer" onPress={() => { this.restart();
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
