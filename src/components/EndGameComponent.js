import React from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button} from 'react-native-elements';
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import * as ScreenOrientation from "expo/build/ScreenOrientation/ScreenOrientation";
import {Rows, Table} from "react-native-table-component";
import moment from "moment";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


class EndGameComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableDate: []
        }
    }

    componentDidMount(): void {
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

    render() {
        const {players} = this.props.gameReducer;
        players.sort(function (a, b) {
            return b.points - a.points ;
        });
        console.log(players)

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
                                data={players}
                                renderItem={({item, index}) => (
                                    <View style={ styles.row }>
                                        <View style={ styles.headRowID }>
                                            {index !== 0 ?
                                                (<Text  style={ styles.textTable }> {index+1} </Text>) :
                                                (
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Image source={require('./icons/crowns.png')}
                                                            style={{
                                                                width: wp("10%"),
                                                                height: wp("10%"),
                                                            }}/>
                                                    </View>
                                                )

                                            }
                                        </View>
                                        <View style={ styles.headRowName }>
                                            <Text  style={ styles.textTable }> {item.name} </Text>
                                        </View>
                                        <View style={ styles.headRowPoints }>
                                            <Text  style={ styles.textTable }> {item.points} </Text>
                                        </View>
                                    </View>
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
        height: wp("85%")
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
