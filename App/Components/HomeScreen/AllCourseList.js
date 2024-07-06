import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllCourseList } from '../../Services'
import SubHeading from '../SubHeading';
import Colors from '../../../assets/colors/Colors';
import CourseItem from './CourseItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function AllCourseList({userType, data, input }) {
  let count = 0;
  const navigation = useNavigation();
  // console.log(data);
  const setCount = () => {
    count++;
    if (count === data.length) {
      return (<View><Text>There is no course you're looking for</Text></View>)
    }
  }


  return (
    <View style={{ marginBottom: 30 }}>
      {input === "" ? "" : <SubHeading text={'Result Search Courses'} />}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => (
          input === ""
            ? ""
            : item.name.toLowerCase().includes(input.toLowerCase())
              ? <TouchableOpacity onPress={() => navigation.navigate('course-detail', { userType: userType, course: item })}>
                <CourseItem item={item} />
              </TouchableOpacity> : setCount()
        )}
      />
    </View>
  )

}