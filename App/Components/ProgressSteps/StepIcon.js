import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const StepIcon = ({
  stepCount,
  stepNum,
  isFirstStep,
  isLastStep,
  borderWidth,
  borderStyle,
  activeStepIconBorderColor,
  progressBarColor,
  completedProgressBarColor,
  activeStepIconColor,
  disabledStepIconColor,
  completedStepIconColor,
  labelFontFamily,
  labelColor,
  labelFontSize,
  activeLabelColor,
  activeLabelFontSize,
  completedLabelColor,
  activeStepNumColor,
  completedStepNumColor,
  disabledStepNumColor,
  completedCheckColor,
  isCompletedStep,
  isActiveStep,
  label
}) => {
  let styles;

  if (isActiveStep) {
    styles = {
      circleStyle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: "#C6D6FF",
        borderColor: "#C6D6FF",
        borderWidth: 5,
        bottom: -8,
      },
      circleText: {
        alignSelf: 'center',
        top: 20 / 3,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        fontFamily: labelFontFamily,
        color: activeLabelColor,
        fontSize: activeLabelFontSize || labelFontSize,
      },
      leftBar: {
        position: 'absolute',
        top: 40 / 2.22,
        left: 0,
        right: 36,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: "#C6D6FF",
        marginRight: 12,
      },
      rightBar: {
        position: 'absolute',
        top: 40 / 2.22,
        right: 0,
        left: 40 + 8,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: "#C6D6FF",
        marginLeft: 12,
      },
      stepNum: {
        color: activeStepNumColor,
      },
    };
  } else if (isCompletedStep) {
    styles = {
      circleStyle: {
        width: 20,
        height: 20,
        borderRadius: 18,
        backgroundColor: "#C6D6FF",
        bottom: -8,
      },
      circleText: {
        alignSelf: 'center',
        top: 18 / 2,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        fontFamily: labelFontFamily,
        color: completedLabelColor,
        marginTop: 4,
        fontSize: labelFontSize,
      },
      leftBar: {
        position: 'absolute',
        top: 36 / 2,
        left: 0,
        right: 0,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: "#C6D6FF",
        marginRight: 36 / 2 + 4,
      },
      rightBar: {
        position: 'absolute',
        top: 36 / 2,
        right: 0,
        left: 18,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: "#C6D6FF",
        marginLeft: 36 / 2 + 4,
      },
      stepNum: {
        color: completedStepNumColor,
      },
    };
  } else {
    styles = {
      circleStyle: {
        width: 20,
        height: 20,
        borderRadius: 18,
        backgroundColor: disabledStepIconColor,
        bottom: -8,
      },
      circleText: {
        alignSelf: 'center',
        top: 18 / 2,
      },
      labelText: {
        textAlign: 'center',
        flexWrap: 'wrap',
        width: 100,
        paddingTop: 4,
        fontFamily: labelFontFamily,
        color: labelColor,
        marginTop: 4,
        fontSize: labelFontSize,
      },
      leftBar: {
        position: 'absolute',
        top: 36 / 2,
        left: 0,
        right: 18,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: progressBarColor,
        marginRight: 36 / 2 + 4,
      },
      rightBar: {
        position: 'absolute',
        top: 36 / 2,
        right: 0,
        left: 0,
        borderTopStyle: borderStyle,
        borderTopWidth: borderWidth,
        borderTopColor: progressBarColor,
        marginLeft: 36 / 2 + 4,
      },
      stepNum: {
        color: disabledStepNumColor,
      },
    };
  }

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <View style={styles.circleStyle}>
        <Text style={styles.circleText}>
          {isCompletedStep ? (
            <Text style={{ color: completedCheckColor }}></Text>
          ) : (
            <Text style={styles.stepNum}></Text>
          )}
        </Text>
      </View>
      <Text style={styles.labelText}>{label}</Text>
      {!isFirstStep && <View style={styles.leftBar} />}
      {!isLastStep && <View style={styles.rightBar} />}
    </View>
  );
};

StepIcon.propTypes = {
  stepCount: PropTypes.number,
  stepNum: PropTypes.number,
  isFirstStep: PropTypes.bool,
  isLastStep: PropTypes.bool,
  borderWidth: PropTypes.number,
  borderStyle: PropTypes.string,
  activeStepIconBorderColor: PropTypes.string,
  progressBarColor: PropTypes.string,
  completedProgressBarColor: PropTypes.string,
  activeStepIconColor: PropTypes.string,
  disabledStepIconColor: PropTypes.string,
  completedStepIconColor: PropTypes.string,
  labelFontFamily: PropTypes.string,
  labelColor: PropTypes.string,
  labelFontSize: PropTypes.number,
  activeLabelColor: PropTypes.string,
  activeLabelFontSize: PropTypes.number,
  completedLabelColor: PropTypes.string,
  activeStepNumColor: PropTypes.string,
  completedStepNumColor: PropTypes.string,
  disabledStepNumColor: PropTypes.string,
  completedCheckColor: PropTypes.string,
  isCompletedStep: PropTypes.bool,
  isActiveStep: PropTypes.bool,
  label: PropTypes.string,
};

StepIcon.defaultProps = {
  borderWidth: 3,
  borderStyle: 'solid',
  activeStepIconBorderColor: '#C6D6FF',
  progressBarColor: '#ebebe4',
  completedProgressBarColor: '#4BB543',
  activeStepIconColor: '#C6D6FF',
  completedStepIconColor: '#4BB543',
  disabledStepIconColor: '#ebebe4',
  labelColor: 'lightgray',
  labelFontSize: 14,
  activeLabelColor: '#4BB543',
  completedLabelColor: 'lightgray',
  activeStepNumColor: 'black',
  completedStepNumColor: 'black',
  disabledStepNumColor: 'white',
  completedCheckColor: 'white',
  isCompletedStep: false,
  isActiveStep: false,
};

export default StepIcon;
