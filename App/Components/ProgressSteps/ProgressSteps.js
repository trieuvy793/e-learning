import React, { useState, useEffect, Children, cloneElement } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { times } from 'lodash';
import PropTypes from 'prop-types';
import StepIcon from './StepIcon';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Goal from './../../../assets/images/goal.png';

const ProgressSteps = ({ activeStep: initialActiveStep, isComplete, topOffset, marginBottom, children }) => {
  const [stepCount, setStepCount] = useState(0);
  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const navigate = useNavigation();

  useEffect(() => {
    setStepCount(Children.count(children));
  }, [children]);

  useEffect(() => {
    setActiveStep(initialActiveStep);
  }, [initialActiveStep]);

  const renderStepIcons = () => {
    let steps = [];

    times(stepCount, (i) => {
      const isCompletedStep = isComplete ? true : i < activeStep;
      const isActiveStep = isComplete ? false : i === activeStep;

      steps.push(
        <View key={i}>
          <View>
            <StepIcon
              stepNum={i + 1}
              label={children[i].props.label}
              isFirstStep={i === 0}
              isLastStep={i === stepCount - 1}
              isCompletedStep={isCompletedStep}
              isActiveStep={isActiveStep}
            />
          </View>
        </View>
      );
    });

    return steps;
  };

  const handleSetActiveStep = (step) => {
    if (step >= stepCount - 1) {
      setActiveStep(stepCount - 1);
    }

    if (step > -1 && step < stepCount - 1) {
      setActiveStep(step);
    }
  };

  const styles = {
    stepIcons: {
      position: 'relative',
      justifyContent: 'space-evenly',
      gap: -40,
      alignSelf: 'center',
      flexDirection: 'row',
      top: 14,
      marginBottom: 14
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="flex-row items-center justify-between px-3" style={{borderBottomWidth: 0.2, marginBottom: 9, borderColor:"#AFAFAF"}}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <View style={styles.stepIcons}>{renderStepIcons()}</View>
        </View>
        <Image source={Goal} className="w-8 h-8" />
      </View>
      <View style={{ flex: 1 }}>
        {cloneElement(children[activeStep], {
          setActiveStep: handleSetActiveStep,
          activeStep: activeStep,
          stepCount: stepCount,
        })}
      </View>
    </View>
  );
};

ProgressSteps.propTypes = {
  isComplete: PropTypes.bool,
  activeStep: PropTypes.number,
  topOffset: PropTypes.number,
  marginBottom: PropTypes.number,
};

ProgressSteps.defaultProps = {
  isComplete: false,
  activeStep: 0,
  topOffset: 30,
  marginBottom: 50,
};

export default ProgressSteps;
