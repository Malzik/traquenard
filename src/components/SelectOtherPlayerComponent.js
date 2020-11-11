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
            card: this.props.route.params.card
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        })
    }

    changeSelectedPlayer(player) {
        const {navigation, updateSelectedPlayer} = this.props;
        const {card} = this.state;

        updateSelectedPlayer(player);
        navigation.navigate("All", {card})
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
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "titre"
    },
    titleView: {
        height: wp('20%'),
    },
    listView: {
        height: wp('70%'),
        justifyContent:'center',
        paddingHorizontal: wp('28%'),
    },
    playerView: {
        flex: 1,
        marginTop: wp('3%'),
        backgroundColor: '#2A9BDA',
        borderRadius:wp('5%'),
    },
    playerText:{
        flex:1,
        textAlign: 'center',
        fontSize: wp('12%'),
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
