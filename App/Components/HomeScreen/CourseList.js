import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { getCourseList } from '../../Services'

export default function CourseList(level) {

  useEffect(()=>{
    getCourses();
  })

  const getCourses=()=>{
    getCourseList(level).then(resp=>{
      console.log("RESP",resp);
    })
  }
  return (
    <View>
      <Text>CourseList</Text>
    </View>
  )
}