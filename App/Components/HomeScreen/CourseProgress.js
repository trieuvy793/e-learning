import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeading from '../SubHeading'
import { GetAllProgressCourse } from '../../Services'
import { useUser } from '@clerk/clerk-expo'
import CourseItem from './CourseItem'
import { useNavigation } from '@react-navigation/native'

export default function CourseProgress() {

  const {user}=useUser();
  const navigation=useNavigation();
  const [progressCourseList,setProgressCourseList] = useState();

  useEffect(()=>{
    user&&GetAllProgressCourseList();
  },[user])

  const GetAllProgressCourseList=()=>{
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then(resp=>{
      setProgressCourseList(resp.userEnrolledCourses);
    })
  }

  return (
    <View>
      <SubHeading text={'In Progress'}/>

      <FlatList
        data={progressCourseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={() => navigation.navigate('course-detail', {course:item.course})}
          >
            <CourseItem item={item.course} 
            completedChapter={item?.completedChapter?.length}/>
          </TouchableOpacity>
        )}
      />

    </View>
  )
}