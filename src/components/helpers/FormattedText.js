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

        if (text.includes("points")) {
            const currentPlayer = gameReducer.players[gameReducer.currentPlayer];
            text = this.replaceAll(text, "points", currentPlayer.points)
        }
        if (text.includes("{currentPlayer}")) {
            const currentPlayer = gameReducer.players[gameReducer.currentPlayer];
            text = this.replaceAll(text, "{currentPlayer}", currentPlayer.name)
        }
        if (text.includes("{selectedPlayer}")) {
            const selectedPlayer = gameReducer.selectedPlayer;
            text = this.replaceAll(text, "{selectedPlayer}", selectedPlayer.name)
        }
        if (text.includes("{selectedCategory}")) {
            const selectedCategory = gameReducer.selectedCategory;
            text = this.replaceAll(text, "{selectedCategory}", selectedCategory.name)
        }
        if (text.includes("{sip}")) {
            const difficulty = gameReducer.difficulty;
            const sip = Math.round(parseInt(this.props.sip) * difficulty);
            text = this.replaceAll(text, "{sip}", sip)
        }
        if (text.includes("{playerX}")){
            const place = Math.floor(Math.random() * gameReducer.players.length);
            let player = gameReducer.players[place];
            text = this.replaceAll(text, "{playerX}", player.name);
            if (text.includes("{playerY}")) {
                let place2 = Math.floor(Math.random() * gameReducer.players.length);
                while (place2 === place){
                    place2 = Math.floor(Math.random() * gameReducer.players.length);
                }
                player = gameReducer.players[place2];
                text = this.replaceAll(text, "{playerY}", player.name)
            }

        }
        return text;
    }

    replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    render() {
        if (this.props.text !== null) {
            return this.formatText(this.props.text)
        }
        return this.props.text;
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
