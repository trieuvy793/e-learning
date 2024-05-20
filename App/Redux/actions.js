export const SET_EXERCISES = 'SET_EXERCISES';
export const SET_LEVEL = 'SET_LEVEL';

export const setExercises = (exercises) => ({
  type: SET_EXERCISES,
  payload: exercises,
});

export const setLevel = (level) => ({
  type: SET_LEVEL,
  payload: level,
});