import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from 'react-native-elements';
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import * as ScreenOrientation from "expo/build/ScreenOrientation/ScreenOrientation";
import {Row, Rows, Table} from "react-native-table-component";


class EndGameComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Nom', 'Données', 'Reçu'],
            tableData: [
                ['Jean', '2', '33'],
                ['Denis', '2', '35'],
                ['Bruno', '2', '365'],
                ['Jesus', '2', '332']
            ]
        }
    }

    restart() {
        this.props.restartGame();
        this.props.navigation.navigate('SelectPlayer');
    }

    render() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        return (
            <ScrollView style={ styles.container }>
                <View style={ styles.content }>
                    <View style={ styles.header }>
                        <Text  style={ styles.title }> Fini </Text>
                    </View>
                    <View style={ styles.result }>
                        <Table>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textHead}/>
                            <Rows data={this.state.tableData} style={styles.row} textStyle={styles.textTable}/>
                        </Table>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 75}}>
                        <Button titleStyle={{textAlign: 'center', color: '#fff',
                            fontSize: 20,  fontFamily: "MainTitle"
                        }} buttonStyle={{ backgroundColor: "#DA2A2A",
                            borderRadius: 60, width: 200, }}
                                title="Rejouer" onPress={() => { this.restart();
                        }}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
    content: {
        flex: 0.58,
    },
    result: {
        marginTop: 20,
        padding: 30,
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    head: {
        marginBottom: 10,
    },
    row:{
        marginTop: 10,
    },
    textHead: {
        fontSize: 25,
        color: '#fff',
        fontFamily: 'titre',
        textAlign: 'center',
    },
    textTable: {
        fontSize: 22,
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
