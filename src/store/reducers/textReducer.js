import duel from '../../../assets/game/duels';
import question from '../../../assets/game/questions';
import oneversusall from '../../../assets/game/oneversusall';
import friendships from '../../../assets/game/friendships';
import everyone from '../../../assets/game/everyone';
import fr from '../../../assets/texts/fr';
import en from '../../../assets/texts/en';

const initialState = {
    duels: [],
    questions: [],
    oneversusall: [],
    friendships: [],
    everyone: [],
    categories: [],
    texts: [],
    language: "fr"
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
            break;
        case 'INIT_TEXT':
            newState.texts = fr.texts;
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
        case 'CHANGE_LANG':
            if (action.lang === "fr") {
                newState.texts = fr.texts;
                newState.language = "fr";
                break;
            }
            if (action.lang === "en") {
                newState.texts = en.texts;
                newState.language = "en";
            }
            break;
        default:
            break;
    }

    return newState;
};

export {textReducer};
