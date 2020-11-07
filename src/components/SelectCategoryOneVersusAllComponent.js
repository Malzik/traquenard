import {StyleSheet, Text, View} from "react-native";
import {connect} from 'react-redux';
import React from "react";
import * as gameActions from '../store/actions/gameAction';
import {bindActionCreators} from "redux"
import {OneVersusAll} from "./OneVersusAllComponent";
import {FormattedText} from "./helpers/FormattedText";
import {Button} from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

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
                                    fontSize: wp("8%"), fontFamily: "MainTitle"
                                }} buttonStyle={{
                                    backgroundColor: "#2A2A2A",
                                    borderRadius: wp("3%")
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
        backgroundColor: '#DA2A2A',
    },
    title: {
        padding: wp("4%"),
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("11%"),
        fontFamily: "MainTitle"
    },
    contentText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: wp("8%"),
        fontFamily: "titre"
    },
    titleView: {
        height: wp('28%'),
    },
    contentTextView: {
        height: wp('32%'),
    },
    categoryView: {
        height: wp('40%'),
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap:'wrap',
        alignItems: 'flex-start',
    },
    category:{
        width: "30%",
        paddingHorizontal: wp("2%"),
        marginBottom: wp("3%")
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
