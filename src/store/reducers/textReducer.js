import duel_fr from '../../../assets/game/fr/duels';
import question_fr from '../../../assets/game/fr/questions';
import oneversusall_fr from '../../../assets/game/fr/oneversusall';
import friendships_fr from '../../../assets/game/fr/friendships';
import everyone_fr from '../../../assets/game/fr/everyone';
import duel_en from '../../../assets/game/en/duels';
import question_en from '../../../assets/game/en/questions';
import oneversusall_en from '../../../assets/game/en/oneversusall';
import friendships_en from '../../../assets/game/en/friendships';
import everyone_en from '../../../assets/game/en/everyone';
import fr from '../../../assets/texts/fr';
import en from '../../../assets/texts/en';

const rules = {
    "en": {
        duels: duel_en.duels,
        questions: question_en.questions,
        friendships: friendships_en.friendships,
        oneversusall: oneversusall_en.oneversusall,
        everyone: everyone_en.everyone,
        texts: en.texts
    },
    "fr": {
        duels: duel_fr.duels,
        questions: question_fr.questions,
        friendships: friendships_fr.friendships,
        oneversusall: oneversusall_fr.oneversusall,
        everyone: everyone_fr.everyone,
        texts: fr.texts
    }
}
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
            newState.duels = rules[newState.language].duels;
            newState.questions = rules[newState.language].questions;
            newState.oneversusall = rules[newState.language].oneversusall;
            newState.categories = Object.keys(rules[newState.language].oneversusall).map(category => ({name: category}));
            newState.friendships = rules[newState.language].friendships;
            newState.everyone = rules[newState.language].everyone;
            break;
        case 'INIT_TEXT':
            newState.texts = rules[newState.language].texts;
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
            newState.texts = en.texts;
            newState.language = "en";
            break;
        default:
            break;
    }

    return newState;
};

export {textReducer};
