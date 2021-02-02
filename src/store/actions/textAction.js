const initGame = () => ({
    type: 'INIT_GAME'
});

const initText = () => ({
    type: 'INIT_TEXT'
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

const changeLang = (lang) => ({
    type: 'CHANGE_LANG',
    lang
});

export {
    initGame,
    removeQuestion,
    removeQuestionFromCategory,
    initText,
    changeLang
};
