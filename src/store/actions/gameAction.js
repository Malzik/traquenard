const addPlayers = players => ({
    type: 'ADD_PLAYERS',
    players,
});

const changeScene = newScene => ({
    type: 'CHANGE_SCENE',
    newScene,
});

const changeDifficulty  = newDifficulty => ({
    type: 'CHANGE_DIFFICULTY',
    newDifficulty,
});

const restartGame = () => ({
    type: 'RESTART',
});



export {
    addPlayers,
    changeScene,
    changeDifficulty,
    restartGame
};
