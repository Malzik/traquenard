const initialState = {
    players: [],
    maxTurn: 4,
    difficulty: 3,
    currentTurn: 0,
    currentPlayer: null,
    selectedPlayer: null,
    selectedCategory: null,
    scene: null,
    showEveryone: true,
};

const getMaxTurn = (playersCount) => {
    if (playersCount <= 4) {
        return 5;
    } else if (playersCount <= 6) {
        return 4;
    } else if (playersCount <= 8) {
        return 3;
    }
    return 2;
}

const gameReducer = (state = initialState, action = {}) => {
    const newState = { ...state };

    switch (action.type) {
        case 'ADD_PLAYERS':
            newState.players = action.players;
            newState.maxTurn = action.maxTurn;
            break;
        case 'CHANGE_DIFFICULTY':
            newState.difficulty = action.newDifficulty;
            break;
        case 'RESTART':
            newState.players.map((player) => {
                player.points = 0;
            });
            newState.difficulty = 3;
            newState.currentTurn = 0;
            newState.currentPlayer = null;
            newState.scene = null;
            newState.showEveryone = true;
            break;
        case 'UPDATE_CURRENT_PLAYER':
            if (newState.currentPlayer === null)
                newState.currentPlayer = 0;
            else if (newState.currentPlayer + 1 < newState.players.length) {
                newState.currentPlayer = newState.currentPlayer + 1;
            } else {
                newState.currentTurn = newState.currentTurn + 1;
                newState.currentPlayer = 0;
            }
            newState.showEveryone = !newState.showEveryone;
            break;
        case 'UPDATE_SELECTED_PLAYER':
            newState.selectedPlayer = action.selectedPlayer;
            break;
        case 'UPDATE_SELECTED_CATEGORY':
            newState.selectedCategory = action.selectedCategory;
            break;
        case 'ADD_POINTS_DUEL':
            const currentPlayer = newState.players[newState.currentPlayer];
            if(action.win) {
                currentPlayer.points += action.points;
                newState.selectedPlayer.points -= action.points;
                break;
            }
            newState.selectedPlayer.points += action.points;
            currentPlayer.points -= action.points;
            break;
        case 'ADD_POINTS_FRIENDSHIP':
            if(action.win) {
                const currentPlayer = newState.players[newState.currentPlayer];

                currentPlayer.points += action.points;
                newState.selectedPlayer.points += action.points;
            }
            break;
        case 'ADD_POINTS':
            if(action.win) {
                const currentPlayer = newState.players[newState.currentPlayer];
                currentPlayer.points += action.points;
            }
            break;
        case 'UPDATE':
            newState.maxTurn = getMaxTurn(action.players.length)
            break;
        default:
            break;
    }

    return newState;
};

export { gameReducer, getMaxTurn };
