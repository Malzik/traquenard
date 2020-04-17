const initGame = () => ({
    type: 'INIT_GAME'
});

const removeQuestion = (questionType, question) => ({
    type: 'REMOVE_QUESTION',
    questionType,
    question
});

export {
    initGame,
    removeQuestion
};
