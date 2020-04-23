import moment from "moment";

const initialState = {
    players: [],
    maxTurn: 10,
    difficulty: 3,
    currentTurn: 0,
    currentPlayer: null,
    selectedPlayer: null,
    selectedCategory: null,
    startTime: null,
    sipGiven: 0,
    scene: null,
};

const gameReducer = (state = initialState, action = {}) => {
    const newState = { ...state };

    switch (action.type) {
        case 'ADD_PLAYERS':
            newState.players = action.players;
            newState.startTime = moment(new Date());
            break;
        case 'CHANGE_DIFFICULTY':
            newState.difficulty = action.newDifficulty;
            break;
        case 'RESTART':
            newState.players.map((player) => {
                player.sipCount = 0;
                player.sipGiven = 0;
            });
            newState.difficulty = 3;
            newState.currentTurn = 0;
            newState.currentPlayer = null;
            newState.scene = null;
            newState.startTime = null;
            newState.sipGiven = 0;
            break;
        case 'UPDATE_CURRENT_PLAYER':
            if (newState.currentPlayer === null)
                newState.currentPlayer = 0;
            else if (newState.currentPlayer + 1 < newState.players.length) {
                newState.currentPlayer = newState.currentPlayer + 1;
            } else {
                newState.currentPlayer = 0;
            }
            break;
        case 'UPDATE_SELECTED_PLAYER':
            newState.selectedPlayer = action.selectedPlayer;
            break;
        case 'UPDATE_SELECTED_CATEGORY':
            newState.selectedCategory = action.selectedCategory;
            break;
        case 'ADD_SIP':
            newState.sipGiven = parseInt(newState.sipGiven) + parseInt(action.sip);
            break;
        case 'ADD_TURN':
            newState.currentTurn = newState.currentTurn + 1;
            break;
        default:
            break;
    }

    return newState;
};

export { gameReducer };
