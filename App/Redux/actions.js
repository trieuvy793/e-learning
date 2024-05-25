export const SET_EXERCISES = 'SET_EXERCISES';
export const SET_LEVEL = 'SET_LEVEL';
export const SET_PROJECT = 'SET_PROJECT';

export const setExercises = (exercises) => ({
  type: SET_EXERCISES,
  payload: exercises,
});

export const setLevel = (level) => ({
  type: SET_LEVEL,
  payload: level,
});

export const setProject = (project) => ({
  type: SET_PROJECT,
  payload: project,
});