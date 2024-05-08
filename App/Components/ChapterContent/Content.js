import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ContentItem from './ContentItem';
import Colors from '../../../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { ProgressSteps, ProgressStep } from './../ProgressSteps/index';

export default function Content({ content, onChapterFinish }) {
  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);


  const progressStepsStyle = {
    activeStepIconBorderColor: '#C6D6FF',
    activeStepNumColor: '#C6D6FF',
    activeStepIconColor: '#C6D6FF',
    completedStepIconColor: '#C6D6FF',
    completedProgressBarColor: '#C6D6FF',
    completedCheckColor: '#C6D6FF',
  };
  return (
    <View style={{ flex: 1 }} className="bg-BACKGROUND">
      <ProgressSteps {...progressStepsStyle}
      >
        {content.slice(0, 5).map((item, index) => {
          return (
            <ProgressStep key={index} scrollable={true} onSubmit={onChapterFinish}>
              <Text style={{ fontSize: 22, fontWeight: '500', textAlign: 'center' }}>{item.heading}</Text>
              <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * 0.7, padding: 10 }}>

                <ScrollView 
                  showsVerticalScrollIndicator={false}
                  style={{ borderWidth: 1, borderRadius: 16, borderColor:'#208BE8' }} className="bg-white"
                  >
                  <View style={{padding: 10}}>
                    <ContentItem description={item?.description?.html} output={item?.output?.html} />
                  </View>
                </ScrollView>
              </View>
            </ProgressStep>
          );
        })}

      </ProgressSteps>
    </View>
  );
}
