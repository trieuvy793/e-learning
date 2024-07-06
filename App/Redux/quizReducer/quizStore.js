// store.js
import { createStore } from 'redux';
import rootReducer from './quizReducer';

const store = createStore(rootReducer);

export default store;