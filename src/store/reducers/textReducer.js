import duel from '../../../assets/json/duel';
import question from '../../../assets/json/question';
import oneversusall from '../../../assets/json/oneversusall';
import friendships from '../../../assets/json/friendship';
import everyone from '../../../assets/json/everyone';
import texts from '../../../assets/texts/fr';

const initialState = {
    duels: [],
    questions: [],
    oneversusall: [],
    friendships: [],
    everyone: [],
    categories: [],
    texts: []
};

const textReducer = (state = initialState, action = {}) => {
    const newState = {...state};

    switch (action.type) {
        case 'INIT_GAME':
            newState.duels = duel.duels;
            newState.questions = question.questions;
            newState.oneversusall = oneversusall.oneversusall;
            newState.categories = Object.keys(oneversusall.oneversusall).map(category => ({name: category}));
            newState.friendships = friendships.friendships;
            newState.everyone = everyone.everyone;
            newState.texts = texts.texts;
            break;
        case 'REMOVE_QUESTION':
            newState[action.questionType] = newState[action.questionType].filter(question => question.question !== action.question.question);
            break;
        default:
            break;
    }

    return newState;
};

export {textReducer};
