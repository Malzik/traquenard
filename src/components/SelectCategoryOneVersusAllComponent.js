import {StyleSheet, Text, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux"
import {OneVersusAll} from "./OneVersusAllComponent";
import {FormattedText} from "./helpers/FormattedText";
import {Button} from "react-native-elements";

class SelectCategoryOneVersusAllComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            game: this.props.game,
            currentPlayer: {
                name: null
            }
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        })
    }

    changeScene(category): void {
        const {navigation, updateCategory} = this.props;

        updateCategory(category);
        navigation.navigate("OneVersusAll")
    }

    checkIfQuestionRemaining(category) {
        const {textReducer} = this.props;

        return !textReducer.oneversusall[category.name].length > 0;
    }

    render() {
        const {categories, texts} = this.props.textReducer;

        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>
                        <FormattedText text={texts["text.selectCategory.title"]}/>
                    </Text>
                </View>
                <View style={styles.contentTextView}>
                    <Text style={styles.contentText}>
                        <FormattedText text={texts["text.selectCategory.description"]}/>
                    </Text>
                </View>
                <View style={styles.categoryView}>
                    {
                        categories.map((category, index) => {
                            return <View style={styles.category} key={index.toString()}>
                                <Button titleStyle={{
                                    textAlign: 'center', color: '#fff',
                                    fontSize: 30, fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: "#2A2A2A",
                                    borderRadius: 10
                                }}
                                        title={category.name}
                                        onPress={() => this.changeScene(category)}
                                        disabled={this.checkIfQuestionRemaining(category)}
                                />
                            </View>
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3FBD4E',
    },
    title: {
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        fontSize: 40,
        fontFamily: "MainTitle"
    },
    contentText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 30,
        fontFamily: "titre"
    },
    titleView: {
        flex:0.2,
    },
    contentTextView: {
        flex:0.35,
    },
    categoryView: {
        flex:0.45,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    playerView: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#2A2A2A',
        borderRadius:10,
    },
    playerText:{
        flex:1,
        height:60,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: "MainTitle",
        color: "#fff"
    },
    category:{
        width: "30%",
        paddingHorizontal: 20,
        marginBottom: 10
    }
});


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const SelectCategoryOneVersusAll = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectCategoryOneVersusAllComponent);

export {SelectCategoryOneVersusAll, SelectCategoryOneVersusAllComponent};
