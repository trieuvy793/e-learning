import { combineReducers } from 'redux';

const initialState = {
  level: 'basic',
  questions: [],
  currentQuestion: 0,
  score: 0
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'NEXT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case 'INCREMENT_SCORE':
      return { ...state, score: state.score + 1 };
    case 'RESET_QUIZ':
      return { ...state, currentQuestion: 0, score: 0 };
    default:
      return state;
  }
};

export default combineReducers({
  quiz: quizReducer,
});