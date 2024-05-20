import { SET_EXERCISES, SET_LEVEL } from './actions';

const initialState = {
  exercises: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };
    case SET_LEVEL:
      return {
        ...state,
        level: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
