import { combineReducers } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthReducer";


const myReducer = combineReducers({
  user: userAuthReducer,
});

export default myReducer;