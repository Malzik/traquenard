import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux";
import {FormattedText} from "./helpers/FormattedText";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

class SelectOtherPlayerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPlayer: {
                name: null
            },
            selectedComponent: this.props.route.params.component
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        })
    }

    changeSelectedPlayer(player) {
        const {navigation, updateSelectedPlayer} = this.props;
        const {selectedComponent} = this.state;

        updateSelectedPlayer(player);
        navigation.navigate(selectedComponent)
    }

    render() {
        const {players} = this.props.gameReducer;
        const {texts} = this.props.textReducer;
        const {currentPlayer} = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.selectOtherPlayer.title"]}/>
                    </Text>
                </View>
                <View style={styles.listView}>
                    <FlatList
                        data={players}
                        renderItem={({item}) => {
                            if (currentPlayer.name !== item.name) {
                                return <TouchableOpacity onPress={() => this.changeSelectedPlayer(item)}>
                                    <View style={styles.playerView}>
                                        <Text style={styles.playerText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
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
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    titleView: {
        height: wp('20%'),
    },
    listView: {
        height: wp('80%'),
        justifyContent:'center',
        paddingHorizontal: 100,
        marginBottom: 30
    },
    playerView: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#2A9BDA',
        borderRadius:50,
    },
    playerText:{
        flex:1,
        height:60,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: "MainTitle",
        color: "#fff"
    }
});


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const SelectOtherPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectOtherPlayerComponent);

export {SelectOtherPlayer, SelectOtherPlayerComponent};
