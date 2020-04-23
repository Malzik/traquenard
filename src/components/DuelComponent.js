import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import * as textActions from "../store/actions/textAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";

class DuelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duel: {
                question: null,
                sip: null
            }
        }
    }

    componentDidMount(): void {
        const {textReducer, removeQuestion} = this.props;

        const duels = textReducer.duels;
        const duel = duels[Math.floor(Math.random() * duels.length)];
        this.setState({
            duel
        });
        removeQuestion("duels", duel);
    }

    changeScene(): void {
        const {navigation, addSip} = this.props;
        const {duel} = this.state;

        addSip(duel.sip);
        navigation.navigate("EveryonePlay")
    }

    render() {
        const {texts} = this.props.textReducer;
        const {question, sip} = this.state.duel;

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.changeScene()}>
                <View style={styles.flex1}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.duel.title"]}/>
                    </Text>
                </View>
                <View style={styles.flex2}>
                    <Text style={styles.questionText}>{question}</Text>
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
        backgroundColor: '#D42A2A',
    },
    flex1: {
        padding: 10,
    },
    flex2: {
        marginTop: "6%",
        justifyContent: 'center',
        marginBottom: 10,
    },
    flex3: {
        flex: 1,
        margin: 30,
        justifyContent: 'flex-end',
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
    },
    sipText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
    }
});

DuelComponent.propTypes = {
    addSip: PropTypes.func,
    removeQuestion: PropTypes.func,
    navigation: PropTypes.object,
    textReducer: PropTypes.object
};

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions, ...textActions}, dispatch);

const Duel = connect(
    mapStateToProps,
    mapDispatchToProps
)(DuelComponent);

export { Duel, DuelComponent };
