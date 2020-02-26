const initialState = {
    players: [],
    maxTurn: 30,
    difficulty: 3,
    currentTurn: 0,
    selectedPlayer: null,
    scene: null
};

const gameReducer = (state = initialState, action = {}) => {
    const newState = { ...state };

    switch (action.type) {
        case 'ADD_PLAYERS':
            newState.players = action.data;
            break;
        case 'CHANGE_SCENE':
            newState.scene = action.newScene;
            newState.currentTurn = newState.currentTurn + 1;
            break;
        default:
            break;
    }

    return newState;
};

export { gameReducer };
