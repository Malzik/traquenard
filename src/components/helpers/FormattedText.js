import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as gameActions from "../../store/actions/gameAction";

class FormattedTextComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    formatText(text) {
        if (text.includes("{currentPlayer}")) {
            const currentPlayer = this.props.gameReducer.players[this.props.gameReducer.currentPlayer];
            text = text.replace("{currentPlayer}", currentPlayer.name)
        }
        if (text.includes("{selectedPlayer}")) {
            const selectedPlayer = this.props.gameReducer.selectedPlayer;
            text = text.replace("{selectedPlayer}", selectedPlayer.name)
        }
        if (text.includes("{selectedCategory}")) {
            const selectedCategory = this.props.gameReducer.selectedCategory;
            text = text.replace("{selectedCategory}", selectedCategory.name)
        }
        if (text.includes("{sip}")) {
            text = text.replace("{sip}", this.props.sip)
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
