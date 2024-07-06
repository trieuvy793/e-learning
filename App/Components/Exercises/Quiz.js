import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Quiz = () => {
  const param = useRoute().params;
  const data = param.data;
  const dispatch = useDispatch();
  const { level, questions, currentQuestion, score } = useSelector(state => state.quiz);

  useEffect(() => {
    const exercises = data;
    dispatch({ type: 'SET_QUESTIONS', payload: exercises });
  }, []);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      dispatch({ type: 'INCREMENT_SCORE' });
    }
    dispatch({ type: 'NEXT_QUESTION' });
  };

  if (currentQuestion >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Quiz completed! Your score: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={() => dispatch({ type: 'RESET_QUIZ' })}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Introduction</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}><Text style={styles.bold}>Question:</Text> {questions[currentQuestion].question}</Text>
      </View>
      <Text style={styles.subheader}>Your answer:</Text>
      {Object.values(questions[currentQuestion].options).map((option, index) => (
        <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => {/* Handle previous question */}}>
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleAnswer(null)}>
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
  },
  previousButton: {
    backgroundColor: '#f8d7da',
  },
  nextButton: {
    backgroundColor: '#cce5ff',
  },
});

export default Quiz;
