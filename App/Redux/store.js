import { configureStore, createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/exerciseProject';
import myReducer from './reducers';


export const store = configureStore({
  reducer: rootReducer,
});

export const Store = createStore(myReducer);