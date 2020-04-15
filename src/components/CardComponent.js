import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {bindActionCreators} from "redux";
import * as gameActions from "../store/actions/gameAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button} from 'react-native-elements';
import {FormattedText} from "./helpers/FormattedText";

class CardComponent extends React.Component {

    constructor(props) {
        super(props);

        const texts = [
            "text.game.duel",
            "text.game.friendship",
            "text.game.question",
            "text.game.oneversusall",
            "text.card.title"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.gameReducer.texts[text];
        });
        this.state = {
            texts: textCollection
        };
    }

    componentDidMount(): void {
    }

    render() {
        const {texts} = this.state;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}><FormattedText text={texts["text.card.title"]}/></Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.duoQuestion}>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{
                                textAlign: 'center', color: '#fff',
                                fontSize: 40, fontFamily: "MainTitle"
                            }} buttonStyle={{
                                backgroundColor: "#D42A2A",
                                borderRadius: 10
                            }}
                                    title={texts["text.game.duel"]} onPress={() => this.props.changeScene("duel")}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{
                                textAlign: 'center', color: '#fff',
                                fontSize: 40, fontFamily: "MainTitle"
                            }} buttonStyle={{
                                backgroundColor: "#2A9BDA",
                                borderRadius: 10
                            }}
                                    title={texts["text.game.friendship"]}
                                    onPress={() => this.props.changeScene("friendship")}
                            />
                        </View>
                    </View>
                    <View style={ styles.duoQuestion }>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{
                                textAlign: 'center', color: '#fff',
                                fontSize: 40, fontFamily: "MainTitle"
                            }} buttonStyle={{
                                backgroundColor: "#FFE332",
                                borderRadius: 10
                            }}
                                    title={texts["text.game.question"]}
                                    onPress={() => this.props.changeScene("question")}
                            />
                        </View>
                        <View style={{flex: 0.47}}>
                            <Button titleStyle={{
                                textAlign: 'center', color: '#fff',
                                fontSize: 40, fontFamily: "MainTitle"
                            }} buttonStyle={{
                                backgroundColor: "#3FBD4E",
                                borderRadius: 10
                            }}
                                    title={texts["text.game.oneversusall"]}
                                    onPress={() => this.props.changeScene("oneversusall")}
                            />
                        </View>
                    </View>
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
    content: {
        flex: 0.8,
        justifyContent: 'center',
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 35,
        fontFamily: "titre"
    },
    duoQuestion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    randomIcon: {
        padding: 10,
        alignItems: 'center',
    }
});


CardComponent.propTypes = {
    changeScene: PropTypes.func,
    updateCurrentUser: PropTypes.func
};

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...gameActions }, dispatch);

const Card = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardComponent);

export { Card, CardComponent };
