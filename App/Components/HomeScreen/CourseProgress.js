import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubHeading from '../SubHeading'
import { GetAllProgressCourse } from '../../Services'
// import { useUser } from '@clerk/clerk-expo'
import CourseItem from './CourseItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'

export default function CourseProgress({refreshing}) {

  const { user } = useUser();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [progressCourseList, setProgressCourseList] = useState();
  
  useEffect(() => {
    if (isFocused || refreshing) {
      user && GetAllProgressCourseList();
    }
  }, [isFocused, refreshing])

  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then(resp => {
      setProgressCourseList(resp.userEnrolledCourses);
    })
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <SubHeading text={'In Progress'} />

      <FlatList
        data={progressCourseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('course-detail', { course: item.course })}
          >
            <CourseItem item={item.course}
              completedChapter={item?.completedChapter?.length} />
          </TouchableOpacity>
        )}
      />

    </View>
  )
}
