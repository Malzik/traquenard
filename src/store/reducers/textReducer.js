import duel from '../../../assets/game/duel';
import question from '../../../assets/game/question';
import oneversusall from '../../../assets/game/oneversusall';
import friendships from '../../../assets/game/friendship';
import everyone from '../../../assets/game/everyone';
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
            newState[action.questionType] = newState[action.questionType].filter(question =>
                question.question !== action.question.question
            );
            break;
        case 'REMOVE_QUESTION_FROM_CATEGORY':
            newState.oneversusall[action.category] = newState.oneversusall[action.category].filter(question =>
                question.question !== action.question.question
            );
            break;
        default:
            break;
    }

    return newState;
};

export {textReducer};
