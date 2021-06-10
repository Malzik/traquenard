import React                                                   from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View}       from "react-native";
import {bindActionCreators}                                    from "redux";
import * as gameActions                                        from "../store/actions/gameAction";
import PropTypes                                               from "prop-types";
import {connect}                                               from "react-redux";
import {FormattedText}                                         from "./helpers/FormattedText";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { ApplicationText }                                     from "./helpers/ApplicationText";


class SelectDifficultyComponent extends React.Component {
    setDifficulty(difficulty) {
        const {changeDifficulty, updateCurrentUser, navigation} = this.props;

        changeDifficulty(difficulty);
        updateCurrentUser();
        navigation.navigate('Card')
    }

    render() {
        const {texts} = this.props.textReducer;

        return (
            <View style={ styles.container }>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.chooseDifficulty.title"]}/>
                    </Text>
                </View>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => this.setDifficulty(0.5)} style={styles.img}>
                        <Image source={require('./icons/diff_1.png')} style={{width: wp("30%"), height: wp("30%")}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(0.75)} style={styles.img}>
                        <Image source={require('./icons/diff_2.png')} style={{width: wp("30%"), height: wp("30%")}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(1)} style={styles.img}>
                        <Image source={require('./icons/diff_3.png')} style={{width: wp("30%"), height: wp("30%")}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(1.5)} style={styles.img}>
                        <Image source={require('./icons/diff_4.png')} style={{width: wp("30%"), height: wp("30%")}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setDifficulty(2)} style={styles.img}>
                        <Image source={require('./icons/diff_5.png')} style={{width: wp("30%"), height: wp("30%")}}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textDesc}>
                    {ApplicationText("text.chooseDifficulty.description")}
                </Text>
            </View>

        );
    }
}

SelectDifficultyComponent.propTypes = {
    changeDifficulty: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        flexDirection: 'column'
    },
    header: {
        height: wp('15%'),
    },
    content: {
        height: wp('50%'),
        marginTop: wp('20%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('7%'),
    },
    textDesc: {
        color: '#fff',
        fontSize: wp("4%"),
        fontFamily: "gorgeesText",
        padding: wp("2%"),
        textAlign: 'center'
    },
    img: {
        padding: wp("1%")
    },
    title: {
        marginTop: wp("7%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("9%"),
        fontFamily: "titre"
    },
});

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const SelectDifficulty = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectDifficultyComponent);

export { SelectDifficulty, SelectDifficultyComponent };
