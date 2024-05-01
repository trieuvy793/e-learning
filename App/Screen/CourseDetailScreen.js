import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { enrollCourse, getUserEnrolledCourse } from '../Services';
import { useUser } from '@clerk/clerk-expo';
import Toast , {BaseToast} from 'react-native-toast-message';
import Colors from '../../assets/colors/Colors';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const{isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);
  const [userEnrolledCourse,setUserEnrolledCourse]=useState([]);
  const[showDescription, setShowDescription] = useState(true);
  const {user} = useUser();

  useEffect(()=>{
    //console.log(params.course)
    if(user&&params.course)
    {
      GetUserEnrolledCourse();
    }
  },[params.course,user])

  useEffect(()=>{
    isChapterComplete&&GetUserEnrolledCourse();
  },[isChapterComplete])

  const UserEnrolledCourse=()=>{
    enrollCourse(params.course.id,user.primaryEmailAddress.emailAddress).then(resp=>{
      if (resp)
      {
        // ToastAndroid.show('Course Enrolled Successfully!', ToastAndroid.LONG);
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
    <ScrollView className="p-5 pt-0 bg-BACKGROUND">
      <TouchableOpacity className="flex flex-row items-center mt-3 justify-between" onPress={()=>navigate.goBack()}>
        <AntDesign name="left" size={24} color="black"/>
        <Text className="text-xl">{params.course?.level} Course</Text>
        <Text></Text>
      </TouchableOpacity>
      
      <DetailSection course={params.course} description={{showDescription, setShowDescription}} userEnrolledCourse={userEnrolledCourse}
      enrollCourse={()=>UserEnrolledCourse()}/>

      <ChapterSection chapterList={params.course.chapters}
      userEnrolledCourse={userEnrolledCourse}/>
    </ScrollView>
    
  )
}