import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class OneVersusAllComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={ styles.container }>
                <TouchableOpacity  onPress={() => this.props.changeScene("card")}>
                    <View>
                        <Text style={ styles.title }> Seul contre Tous, Catégorie : Cinéma !</Text>
                    </View>
                    <View>
                        <Text style={ styles.questionText }>
                            A tour de rôle : celui qui trouvera le plus de personnage
                            dans le film le seigneur des anneaux gagne
                        </Text>
                    </View>
                    <View>
                        <Text style={ styles.gorgeesText }>10 Gorgées en jeu</Text>
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
