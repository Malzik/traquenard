const addPlayers = players => ({
    type: 'ADD_PLAYERS',
    players,
});

const changeScene = newScene => ({
    type: 'CHANGE_SCENE',
    newScene,
});

const changeDifficulty = newDifficulty => ({
    type: 'CHANGE_DIFFICULTY',
    newDifficulty,
});

const restartGame = () => ({
    type: 'RESTART',
});

const updateCurrentUser = () => ({
    type: 'UPDATE_CURRENT_PLAYER',
});

const updateSelectedPlayer = selectedPlayer => ({
    type: 'UPDATE_SELECTED_PLAYER',
    selectedPlayer
});

const updateCategory = selectedCategory => ({
    type: 'UPDATE_SELECTED_CATEGORY',
    selectedCategory
});


export {
    addPlayers,
    changeScene,
    changeDifficulty,
    restartGame,
    updateCurrentUser,
    updateSelectedPlayer,
    updateCategory
};
