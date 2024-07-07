import React from 'react';
import { Provider } from 'react-redux';
import store from '../Redux/quizReducer/quizStore';
import Quiz from '../Components/Exercises/Quiz';
import { useNavigation, useRoute } from '@react-navigation/native'

const Ex = () => {
  const param = useRoute().params;
  return (
    <Provider store={store}>
      <Quiz/>
    </Provider>
  );
};

export default Ex;