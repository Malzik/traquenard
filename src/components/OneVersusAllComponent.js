import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

class OneVersusAllComponent extends React.Component {
    POINTS = 5;
    static TYPE = "oneversusall";
    constructor(props) {
        super(props);
        this.state = {
            oneVersusAll: {
                question: null,
                sip: null
            }
        }
    }

    componentDidMount(): void {
        const {textReducer, gameReducer, removeQuestionFromCategory} = this.props;

        const category = gameReducer.selectedCategory;
        const oneversusall = textReducer.oneversusall;
        const question = oneversusall[category.name][Math.floor(Math.random() * oneversusall[category.name].length)];
        this.setState({
            oneVersusAll: question
        });

        removeQuestionFromCategory(category.name, question);
    }

    changeScene(): void {
        const {navigation, addSip} = this.props;
        const {oneVersusAll} = this.state;

        addSip(oneVersusAll.sip);
        navigation.navigate("WinLoose", {points: this.POINTS, type: "oneversusall"})
    }

    render() {
        const {texts} = this.props.textReducer;
        const {question, sip} = this.state.oneVersusAll;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.oneVersusAll.title"]}/>
                    </Text>
                </View>
                <View style={styles.flex2}>
                    <Text style={styles.questionText}>
                        <FormattedText text={question}/>
                    </Text>
                </View>
                <View style={styles.flex3}>
                    <Text style={styles.sipText}>
                        <FormattedText text={texts["text.sip"]} sip={sip}/>
                    </Text>
                </View>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DA2A2A',
    },
    flex1: {
        height: wp('20%'),
        padding: wp("3%"),
    },
    flex2: {
        height: wp('60%'),
        justifyContent: 'center',
        marginHorizontal:  wp('2%')
    },
    flex3: {
        height: wp('20%'),
        marginRight: wp("6%")
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontSize: wp("10%"),
        fontFamily: "MainTitle"
    },
    questionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("7.5%"),
        fontFamily: "questionText",
    },
    sipText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "gorgeesText",
    }
});



OneVersusAllComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const OneVersusAll = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneVersusAllComponent);

export { OneVersusAll, OneVersusAllComponent };
