import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux"
import {OneVersusAll} from "./OneVersusAllComponent";
import {FormattedText} from "./helpers/FormattedText";

class SelectCategoryOneVersusAllComponent extends React.Component {

    constructor(props) {
        super(props);

        const texts = [
            "text.selectCategory.title",
            "text.selectCategory.description"
        ];
        let textCollection = {};
        texts.forEach(text => {
            textCollection[text] = this.props.gameReducer.texts[text];
        });

        this.state = {
            game: this.props.game,
            currentPlayer: {
                name: null
            },
            category: null,
            texts: textCollection
        };
    }

    componentDidMount() {
        this.setState({
            currentPlayer: this.props.gameReducer.players[this.props.gameReducer.currentPlayer]
        })
    }

    categorySelected(item) {
        this.setState({
            category: item.name
        });
        this.props.updateCategory(item)
    }

    renderSelectCategory() {
        const {texts} = this.state;

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
                    <FlatList
                        data={this.props.gameReducer.categories}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                this.categorySelected(item)
                            }}>
                                <View style={styles.playerView}>
                                    <Text style={styles.playerText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }

    renderGame() {
        return <OneVersusAll currentPlayer={this.state.currentPlayer} selectedCategory={this.state.category}/>
    }

    render() {
        return this.state.category !== null ? this.renderGame() : this.renderSelectCategory();
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
        flex:0.3,
    },
    categoryView: {
        flex:0.5,
        justifyContent:'center',
        paddingHorizontal: 50,
        marginBottom: 20,
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
