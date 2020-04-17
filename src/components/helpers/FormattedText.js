import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as gameActions from "../../store/actions/gameAction";

class FormattedTextComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    formatText(text) {
        const {gameReducer} = this.props;

        if (text.includes("{currentPlayer}")) {
            const currentPlayer = gameReducer.players[gameReducer.currentPlayer];
            text = text.replace("{currentPlayer}", currentPlayer.name)
        }
        if (text.includes("{selectedPlayer}")) {
            const selectedPlayer = gameReducer.selectedPlayer;
            text = text.replace("{selectedPlayer}", selectedPlayer.name)
        }
        if (text.includes("{selectedCategory}")) {
            const selectedCategory = gameReducer.selectedCategory;
            text = text.replace("{selectedCategory}", selectedCategory.name)
        }
        if (text.includes("{sip}")) {
            const difficulty = gameReducer.difficulty;
            const sip = Math.round(parseInt(this.props.sip) * difficulty);
            text = text.replace("{sip}", sip)
        }
        return text;
    }

    render() {
        return this.formatText(this.props.text)
    }
}

const mapStateToProps = state => {
    return state
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({...gameActions}, dispatch);

const FormattedText = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormattedTextComponent);

export {FormattedText, FormattedTextComponent};
