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

const addPointsDuel = (points, win) => ({
    type: 'ADD_POINTS_DUEL',
    points,
    win
});

const addPointsFriendship = (points, win) => ({
    type: 'ADD_POINTS_FRIENDSHIP',
    points,
    win
});

const addPoints = (points, win) => ({
    type: 'ADD_POINTS',
    points,
    win
});


export {
    addPlayers,
    changeScene,
    changeDifficulty,
    restartGame,
    updateCurrentUser,
    updateSelectedPlayer,
    updateCategory,
    addPointsDuel,
    addPointsFriendship,
    addPoints
};
