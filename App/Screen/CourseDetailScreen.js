import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;

  return params.course&&(
    <ScrollView style={{padding:20,paddingTop:0}}>
      <TouchableOpacity onPress={()=>navigate.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black"/>
      </TouchableOpacity>
      
      <DetailSection course={params.course}/>
      <ChapterSection chapterList={params.course.chapters}/>
      
    </ScrollView>
  )
}