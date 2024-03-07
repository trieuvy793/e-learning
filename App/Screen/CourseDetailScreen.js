import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { enrollCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const {user} = useUser();

  useEffect(()=>{
    console.log(params.course)
  },[params.course])

  const UserEnrolledCourse=()=>{
    enrollCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  return params.course&&(
    <ScrollView style={{padding:20,paddingTop:0}}>
      <TouchableOpacity onPress={()=>navigate.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black"/>
      </TouchableOpacity>
      
      <DetailSection course={params.course} enrollCourse={()=>UserEnrolledCourse()}/>
      <ChapterSection chapterList={params.course.chapters}/>
      
    </ScrollView>
  )
}