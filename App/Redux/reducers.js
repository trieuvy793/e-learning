import { SET_EXERCISES, SET_LEVEL, SET_PROJECT } from './actions';

const initialState = {
  exercises: [],
  project: {}
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
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
