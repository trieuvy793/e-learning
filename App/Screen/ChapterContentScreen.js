import { View, Text, ToastAndroid, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { markChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';

export default function ChapterContentScreen() {
  const param=useRoute().params;
  const navigate=useNavigation();
  const{isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);

  //Chapter Id
  //Record Id

  useEffect(()=>{
    console.log("ChapterId",param.chapterId)
    console.log("RecordId",param.userCourseRecordId)
  },[param])

  const onChapterFinish=()=>{
    markChapterCompleted(param.chapterId,param.userCourseRecordId).then(resp=>{
      console.log(resp);
      if(resp)
      {
        ToastAndroid.show('Course Completed!',ToastAndroid.LONG);
        setIsChapterComplete(true);
        navigate.goBack();
      }
    })
  }
  return param.content&&(
    <ScrollView>
      <Content content={param.content}
      onChapterFinish={()=>onChapterFinish()}/>
    </ScrollView>
  )
}