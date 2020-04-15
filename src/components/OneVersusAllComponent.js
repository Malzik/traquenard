import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class OneVersusAllComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enonce: {
                question: null,
                sip: null
            }
        }
    }

    componentDidMount(): void {
        const category = this.props.gameReducer.selectedCategory;
        const oneversusall = this.props.gameReducer.oneversusall;
        const question = oneversusall[category.name][Math.floor(Math.random() * oneversusall[category.name].length)];
        this.setState({
            enonce: question
        })
    }

    render() {

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.changeScene("everyoneplay")}>
                <View style={ styles.flex1 }>
                    <Text style={styles.title}> Seul contre Tous, Catégorie
                        : {this.props.gameReducer.selectedCategory.name} !</Text>
                </View>
                <View style={ styles.flex2 }>
                    <Text style={styles.questionText}>
                        {this.state.enonce.question}
                    </Text>
                </View>
                <View style={ styles.flex3 }>
                    <Text style={styles.gorgeesText}>{this.state.enonce.sip} Gorgées en jeu</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3FBD4E',
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



OneVersusAllComponent.propTypes = {
    changeScene: PropTypes.func,
};
const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const OneVersusAll = connect(
    mapStateToProps,
    mapDispatchToProps
)(OneVersusAllComponent);

export { OneVersusAll, OneVersusAllComponent };
