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
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.changeScene("everyoneplay")}>
                    <View>
                        <Text style={styles.title}> Seul contre Tous, Catégorie
                            : {this.props.gameReducer.selectedCategory.name} !</Text>
                    </View>
                    <View>
                        <Text style={styles.questionText}>
                            {this.state.enonce.question}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.gorgeesText}>{this.state.enonce.sip} Gorgées en jeu</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3FBD4E',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        padding: 10,
        textAlign: 'left',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    questionText: {
        padding: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "questionText",
        marginBottom: 20,
    },
    gorgeesText: {
        textAlign: 'right',
        color: '#fff',
        fontSize: 30,
        fontFamily: "gorgeesText",
        padding: 10,
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
