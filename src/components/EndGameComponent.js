import React from "react";
import {StyleSheet, Text, View} from "react-native";
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
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        return (
            <View style={ styles.container }>
                <View style={ styles.header }>
                    <Text  style={ styles.title }> Fini </Text>
                </View>
                <View style={ styles.result }>
                    <Table>
                        <Rows data={this.state.tableData} style={styles.row} textStyle={styles.textTable}/>
                    </Table>
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
    result: {
        height: "50%",
        paddingHorizontal: "6%"
    },
    bottom: {
        height: "30%",
        alignItems: 'center',
    },
    title: {
        marginTop: wp('10%'),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp('13%'),
        fontFamily: "titre"
    },
    row:{
        marginTop: wp('10%'),
    },
    textTable: {
        fontSize: wp('6%'),
        color: '#fff',
        fontFamily: 'gorgeesText',
        textAlign: 'center',
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
