import React from 'react';
import { View, Dimensions } from 'react-native';

const ProgressButtons = props => (
  <View style={{ flexDirection: 'row', marginTop: 90}}>
    <View style={{ position: 'absolute', left: 10, bottom: 40, width: Dimensions.get('screen').width*0.35 }}>{props.renderPreviousButton()}</View>
    <View style={{ position: 'absolute', right: 10, bottom: 40, width: Dimensions.get('screen').width*0.35 }}>{props.renderNextButton()}</View>
  </View>
);

export default ProgressButtons;
