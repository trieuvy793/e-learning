import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import SubHeading from '../SubHeading';
import { FlatList, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ level }) {

  const [courseList, setCourseList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCourses();
  }, [])

  const getCourses = () => {
    getCourseList(level).then(resp => {
      setCourseList(resp.courses);
    })
  }

  return (
    <View>
      <SubHeading text={level + ' Courses'} color={level == "Basic" && Colors.WHITE} />

      <GestureHandlerRootView>
        <FlatList
          data={courseList}
          key={courseList.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigation.navigate('course-detail')}>
              <CourseItem item={item}/>
            </TouchableOpacity>
            
          )}
        />

      </GestureHandlerRootView>
    </View>

  )

}