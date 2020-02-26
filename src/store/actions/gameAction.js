const addPlayers  = players => ({
    type: 'ADD_PLAYERS',
    players,
});

const changeScene  = newScene => ({
    type: 'CHANGE_SCENE',
    newScene,
});


export {
    addPlayers,
    changeScene
};
