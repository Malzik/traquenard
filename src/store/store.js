import { createStore } from 'redux';
import allReducers from './AllReducers';

const store = createStore(
    allReducers,
);

export { store };
