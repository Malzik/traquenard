import { createStore } from 'redux';
import allReducers     from './AllReducers';
import { initText }    from "./actions/textAction";

const store = createStore(
    allReducers,
);

store.dispatch(initText())

export { store };
