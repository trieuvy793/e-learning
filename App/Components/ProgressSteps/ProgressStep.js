// import React, { Component } from 'react';
// import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';
// import PropTypes from 'prop-types';

// import ProgressButtons from './ProgressButtons';

// class ProgressStep extends Component {
//   onNextStep = async () => {
//     this.props.onNext && (await this.props.onNext());

//     // Return out of method before moving to next step if errors exist.
//     if (this.props.errors) {
//       return;
//     }

//     this.props.setActiveStep(this.props.activeStep + 1);
//   };

//   onPreviousStep = () => {
//     // Changes active index and calls previous function passed by parent
//     this.props.onPrevious && this.props.onPrevious();
//     this.props.setActiveStep(this.props.activeStep - 1);
//   };

//   onSubmit = () => {
//     this.props.onSubmit && this.props.onSubmit();
//     console.log('finish')
//   };

//   renderNextButton = () => {
//     const btnStyle = {
//       textAlign: 'center',
//       padding: 14,
//       width: '100%',
//       backgroundColor: '#C6D6FF',
//       borderRadius:16,
//       ...this.props.nextBtnStyle
//     };

//     const btnTextStyle = {
//       color: '#354573',
//       fontSize: 18,
//       textAlign:'center',
//       ...this.props.nextBtnTextStyle
//     };

//     const disabledBtnText = {
//       color: '#cdcdcd'
//     };

//     let textStyle = [btnTextStyle];
//     if (this.props.nextBtnDisabled) textStyle.push(disabledBtnText);

//     return (
//       <TouchableOpacity
//         style={btnStyle}
//         onPress={this.props.activeStep === this.props.stepCount - 1 ? this.onSubmit : this.onNextStep}
//         disabled={this.props.nextBtnDisabled}
//       >
//         <Text style={textStyle}>
//           {this.props.activeStep === this.props.stepCount - 1 ? this.props.finishBtnText : this.props.nextBtnText}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   renderPreviousButton = () => {
//     const btnStyle = {
//       // textAlign: 'center',
//       padding: 14,
//       width: '100%',
//       backgroundColor:'#F6E8E8',
//       borderRadius:16,
//       ...this.props.previousBtnStyle
//     };

//     const btnTextStyle = {
//       color: '#354573',
//       fontSize: 18,
//       textAlign:'center',
//       ...this.props.previousBtnTextStyle
//     };

//     const disabledBtnText = {
//       color: '#cdcdcd'
//     };
    
//     let textStyle = [btnTextStyle];
//     if (this.props.previousBtnDisabled) textStyle.push(disabledBtnText);

//     return (
//       (this.props.activeStep !== 0 ?
//       <TouchableOpacity style={btnStyle} onPress={this.onPreviousStep} disabled={this.props.previousBtnDisabled}>
//         <Text style={textStyle}>{this.props.activeStep === 0 ?  '' : this.props.previousBtnText}</Text>
//       </TouchableOpacity> : <View></View>)
//     );
//   };

//   render() {
//     const scrollViewProps = this.props.scrollViewProps || {};
//     const viewProps = this.props.viewProps || {};
//     const isScrollable = this.props.scrollable;
//     const buttonRow = this.props.removeBtnRow ? null : (
//       <ProgressButtons 
//         renderNextButton={this.renderNextButton} 
//         renderPreviousButton={this.renderPreviousButton} 
//       />
//     );

//     return (
//       <View style={{ flex: 1 }}>
//         {isScrollable
//           ? <View {...scrollViewProps}>{this.props.children}</View>
//           : <View {...viewProps}>{this.props.children}</View>}

//         {buttonRow}
//       </View>
//     );
//   }
// }

// ProgressStep.propTypes = {
//   label: PropTypes.string,
//   onNext: PropTypes.func,
//   onPrevious: PropTypes.func,
//   onSubmit: PropTypes.func,
//   setActiveStep: PropTypes.func,
//   nextBtnText: PropTypes.string,
//   previousBtnText: PropTypes.string,
//   finishBtnText: PropTypes.string,
//   stepCount: PropTypes.number,
//   nextBtnStyle: PropTypes.object,
//   nextBtnTextStyle: PropTypes.object,
//   nextBtnDisabled: PropTypes.bool,
//   previousBtnStyle: PropTypes.object,
//   previousBtnTextStyle: PropTypes.object,
//   previousBtnDisabled: PropTypes.bool,
//   scrollViewProps: PropTypes.object,
//   viewProps: PropTypes.object,
//   errors: PropTypes.bool,
//   removeBtnRow: PropTypes.bool,
//   scrollable: PropTypes.bool
// };

// ProgressStep.defaultProps = {
//   nextBtnText: 'Next',
//   previousBtnText: 'Previous',
//   finishBtnText: 'Finish',
//   nextBtnDisabled: false,
//   previousBtnDisabled: false,
//   errors: false,
//   removeBtnRow: false,
//   scrollable: true
// };

// export default ProgressStep;
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import ProgressButtons from './ProgressButtons';

const ProgressStep = ({
  onNext,
  onPrevious,
  onSubmit,
  setActiveStep,
  nextBtnText,
  previousBtnText,
  finishBtnText,
  stepCount,
  nextBtnStyle,
  nextBtnTextStyle,
  nextBtnDisabled,
  previousBtnStyle,
  previousBtnTextStyle,
  previousBtnDisabled,
  scrollViewProps,
  viewProps,
  errors,
  removeBtnRow,
  scrollable,
  children,
  activeStep
}) => {
  const onNextStep = async () => {
    onNext && (await onNext());

    if (errors) {
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const onPreviousStep = () => {
    onPrevious && onPrevious();
    setActiveStep(activeStep - 1);
  };

  const renderNextButton = () => {
    const btnStyle = {
      textAlign: 'center',
      padding: 14,
      width: '100%',
      backgroundColor: '#C6D6FF',
      borderRadius: 16,
      ...nextBtnStyle
    };

    const btnTextStyle = {
      color: '#354573',
      fontSize: 18,
      textAlign: 'center',
      ...nextBtnTextStyle
    };

    const disabledBtnText = {
      color: '#cdcdcd'
    };

    let textStyle = [btnTextStyle];
    if (nextBtnDisabled) textStyle.push(disabledBtnText);

    return (
      <TouchableOpacity
        style={btnStyle}
        onPress={activeStep === stepCount - 1 ? onSubmit : onNextStep}
        disabled={nextBtnDisabled}
      >
        <Text style={textStyle}>
          {activeStep === stepCount - 1 ? finishBtnText : nextBtnText}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPreviousButton = () => {
    const btnStyle = {
      padding: 14,
      width: '100%',
      backgroundColor: '#F6E8E8',
      borderRadius: 16,
      ...previousBtnStyle
    };

    const btnTextStyle = {
      color: '#354573',
      fontSize: 18,
      textAlign: 'center',
      ...previousBtnTextStyle
    };

    const disabledBtnText = {
      color: '#cdcdcd'
    };

    let textStyle = [btnTextStyle];
    if (previousBtnDisabled) textStyle.push(disabledBtnText);

    return (
      activeStep !== 0 ? (
        <TouchableOpacity style={btnStyle} onPress={onPreviousStep} disabled={previousBtnDisabled}>
          <Text style={textStyle}>{activeStep === 0 ? '' : previousBtnText}</Text>
        </TouchableOpacity>
      ) : <View />
    );
  };

  const buttonRow = removeBtnRow ? null : (
    <ProgressButtons
      renderNextButton={renderNextButton}
      renderPreviousButton={renderPreviousButton}
    />
  );

  const ContentWrapper = scrollable ? View : ScrollView;
  const contentProps = scrollable ? viewProps : scrollViewProps;

  return (
    <View style={{ flex: 1 }}>
      <ContentWrapper {...contentProps}>{children}</ContentWrapper>
      {buttonRow}
    </View>
  );
};

ProgressStep.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onSubmit: PropTypes.func,
  setActiveStep: PropTypes.func,
  nextBtnText: PropTypes.string,
  previousBtnText: PropTypes.string,
  finishBtnText: PropTypes.string,
  stepCount: PropTypes.number,
  nextBtnStyle: PropTypes.object,
  nextBtnTextStyle: PropTypes.object,
  nextBtnDisabled: PropTypes.bool,
  previousBtnStyle: PropTypes.object,
  previousBtnTextStyle: PropTypes.object,
  previousBtnDisabled: PropTypes.bool,
  scrollViewProps: PropTypes.object,
  viewProps: PropTypes.object,
  errors: PropTypes.bool,
  removeBtnRow: PropTypes.bool,
  scrollable: PropTypes.bool,
  activeStep: PropTypes.number.isRequired,
};

ProgressStep.defaultProps = {
  nextBtnText: 'Next',
  previousBtnText: 'Previous',
  finishBtnText: 'Finish',
  nextBtnDisabled: false,
  previousBtnDisabled: false,
  errors: false,
  removeBtnRow: false,
  scrollable: true,
};

export default ProgressStep;
