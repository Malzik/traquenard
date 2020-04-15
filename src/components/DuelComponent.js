import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedText} from "./helpers/FormattedText";

class DuelComponent extends React.Component {
    constructor(props) {
        super(props);

        const texts = [
            "text.duel.title",
            "text.sip"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.gameReducer.texts[text];
        });

        this.state = {
            currentPlayer: this.props.currentPlayer,
            selectedPlayer: this.props.selectedPlayer,
            duel: {
                question: null,
                sip: null
            },
            texts: textCollection
        }
    }

    componentDidMount(): void {
        const duels = this.props.gameReducer.duels;
        const duel = duels[Math.floor(Math.random() * duels.length)];
        this.setState({
            duel
        })
    }

    render() {
        const {texts} = this.state;

        return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.changeScene("everyoneplay")}>
                    <View style={ styles.flex1 }>
                        <Text style={styles.title}>
                            <FormattedText text={texts["text.duel.title"]}/>
                        </Text>
                    </View>
                    <View style={ styles.flex2 }>
                        <Text style={styles.questionText}>{this.state.duel.question}</Text>
                    </View>
                    <View style={ styles.flex3 }>
                        <Text style={styles.gorgeesText}>
                            <FormattedText text={texts["text.sip"]} sip={this.state.duel.sip}/>
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
        flex: 0.2,
        padding: 10,
    },
    flex2: {
        flex: 0.6,
        justifyContent: 'center',
        marginBottom: 10,
    },
    flex3: {
        flex: 0.2,
        marginRight: 30
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
    gorgeesText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
    }
});

DuelComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Duel = connect(
    mapStateToProps,
    mapDispatchToProps
)(DuelComponent);

export { Duel, DuelComponent };
