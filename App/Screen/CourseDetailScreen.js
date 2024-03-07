import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import Toast , {BaseToast} from 'react-native-toast-message';
import Colors from '../Utils/Colors';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const [userEnrolledCourse,setUserEnrolledCourse]=useState([]);
  const {user} = useUser();

  useEffect(()=>{
    console.log(params.course)
    if(user&&params.course)
    {
      GetUserEnrolledCourse();
    }
  },[params.course,user])

  const toastConfig={
    success: () => (
      <BaseToast
        style={{ borderWidth:1, borderColor:'#63d0a7', backgroundColor:'#f2faf7', topOffset: 100 }}
        contentContainerStyle={{ padding: 20 }}
        text1='Sucess'
        text2='Course Enrolled Successfully!'
        text1Style={{
          fontSize: 15,
          fontWeight: 'bold'
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: 'normal'
        }}
      />
    ),
  }

  const UserEnrolledCourse=()=>{
    enrollCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(resp=>{
      //console.log(resp);
      if (resp)
      {
        // ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
        Toast.show({
          type: 'success'
        })
        GetUserEnrolledCourse();
      }
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  const GetUserEnrolledCourse=()=>{
    getUserEnrolledCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(resp=>{
      //console.log(resp.userEnrolledCourses);
      setUserEnrolledCourse(resp.userEnrolledCourses)
    })
  }
  return params.course&&(
    <ScrollView style={{padding:20,paddingTop:0}}>
      <TouchableOpacity onPress={()=>navigate.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black"/>
      </TouchableOpacity>
      
      <DetailSection course={params.course} 
      userEnrolledCourse={userEnrolledCourse}
      enrollCourse={()=>UserEnrolledCourse()}/>
      <ChapterSection chapterList={params.course.chapters}
      userEnrolledCourse={userEnrolledCourse}/>
      <Toast config={toastConfig} />
    </ScrollView>
    
  )
}