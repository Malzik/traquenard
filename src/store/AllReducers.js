import { combineReducers } from 'redux';
import { gameReducer} from "./reducers/gameReducer";

const allReducers = combineReducers({
    gameReducer: gameReducer
});

export default allReducers;
