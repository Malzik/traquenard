import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp }     from "react-native-responsive-screen";
import React                             from "react";
import { bindActionCreators }            from "redux";
import * as gameActions                  from "../store/actions/gameAction";
import { connect }                       from "react-redux";

class EndGamePlayerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            item: props.item,
            time: props.time
        }
    }

    componentDidMount() {
        const { time } = this.state;
        setTimeout(() => this.setState({ loading: false }), time);
    }

    render() {
        const { item } = this.state;
        if(this.state.loading) {
            return null;
        }
        return(
            <View style={ styles.row }>
                <View style={ styles.headRowID }>
                    {item.position !== 1 ?
                        (<Text  style={ styles.textTable }> {item.position} </Text>) :
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

const EndGamePlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EndGamePlayerComponent);

export {EndGamePlayer, EndGamePlayerComponent};