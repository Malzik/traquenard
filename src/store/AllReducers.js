import {combineReducers}   from 'redux';
import {gameReducer}       from "./reducers/gameReducer";
import {textReducer}       from "./reducers/textReducer";

const allReducers = combineReducers({
    gameReducer: gameReducer,
    textReducer: textReducer
});

export default allReducers;
