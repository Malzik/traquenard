const initGame = () => ({
    type: 'INIT_GAME'
});

const removeQuestion = (questionType, question) => ({
    type: 'REMOVE_QUESTION',
    questionType,
    question
});

const removeQuestionFromCategory = (category, question) => ({
    type: 'REMOVE_QUESTION_FROM_CATEGORY',
    category,
    question
});

export {
    initGame,
    removeQuestion,
    removeQuestionFromCategory
};
