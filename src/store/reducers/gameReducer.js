const initialState = {
    players: [],
    maxTurn: 4,
    difficulty: 3,
    currentTurn: 0,
    selectedPlayer: null,
    scene: null
};

const gameReducer = (state = initialState, action = {}) => {
    const newState = { ...state };

    switch (action.type) {
        case 'ADD_PLAYERS':
            newState.players = action.players;
            break;
        case 'CHANGE_SCENE':
            newState.scene = action.newScene;
            if (["card", "everyoneplay"].includes(action.newScene))
                newState.currentTurn = newState.currentTurn + 1;
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
            newState.selectedPlayer = null;
            newState.scene = null;
            break;
        default:
            break;
    }

    return newState;
};

export { gameReducer };
