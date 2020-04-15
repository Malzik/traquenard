import moment from "moment";
import duel from '../../../assets/json/duel';
import question from '../../../assets/json/question';
import oneversusall from '../../../assets/json/oneversusall';
import friendships from '../../../assets/json/friendship';
import everyone from '../../../assets/json/everyone';
import texts from '../../../assets/texts/fr';

const initialState = {
    players: [],
    maxTurn: 10,
    difficulty: 3,
    currentTurn: 0,
    currentPlayer: null,
    selectedPlayer: null,
    selectedCategory: null,
    startTime: null,
    sipGiven: 0,
    categories: [
        {name: 'Cinéma'},
        {name: 'Série'},
        {name: 'Histoire'},
        {name: 'Jeux-Vidéo'},
        {name: 'Sport'},
        {name: 'Musique'},
    ],
    scene: null,
    duels: [],
    questions: [],
    oneversusall: []
};

const gameReducer = (state = initialState, action = {}) => {
    const newState = { ...state };

    switch (action.type) {
        case 'ADD_PLAYERS':
            newState.players = action.players;
            newState.startTime = moment(new Date());
            newState.duels = duel.duels;
            newState.questions = question.questions;
            newState.oneversusall = oneversusall.oneversusall;
            newState.categories = Object.keys(oneversusall.oneversusall).map(category => ({name: category}));
            newState.friendships = friendships.friendships;
            newState.everyone = everyone.everyone;
            newState.texts = texts.texts;
            break;
        case 'CHANGE_SCENE':
            newState.scene = action.newScene;
            if (["card", "everyoneplay"].includes(action.newScene))
                newState.currentTurn = newState.currentTurn + 1;
            break;
        case 'CHANGE_DIFFICULTY':
            newState.difficulty = action.newDifficulty;
            break;
        case 'RESTART':
            newState.players.map((player) => {
                player.sipCount = 0;
                player.sipGiven = 0;
            });
            newState.difficulty = 3;
            newState.currentTurn = 0;
            newState.currentPlayer = null;
            newState.scene = null;
            newState.startTime = null;
            newState.sipGiven = 0;
            break;
        case 'UPDATE_CURRENT_PLAYER':
            if (newState.currentPlayer === null)
                newState.currentPlayer = 0;
            else if (newState.currentPlayer + 1 < newState.players.length) {
                newState.currentPlayer = newState.currentPlayer + 1;
            } else {
                newState.currentPlayer = 0;
            }
            break;
        case 'UPDATE_SELECTED_PLAYER':
            newState.selectedPlayer = action.selectedPlayer;
            break;
        case 'UPDATE_SELECTED_CATEGORY':
            newState.selectedCategory = action.selectedCategory;
            break;
        case 'ADD_SIP':
            newState.sipGiven = newState.sipGiven + action.sip;
            break;
        default:
            break;
    }

    return newState;
};

export { gameReducer };
