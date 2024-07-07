import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getdata } from '../../Services'
import SubHeading from '../SubHeading';
import Colors from '../../../assets/colors/Colors';
import CourseItem from './CourseItem';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function data({ userType, level, data }) {
  console.log(userType)

  const navigation = useNavigation();
  
  return (
    <View style={{ marginBottom: 30 }}>
      <SubHeading text={level + ' Courses'} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('course-detail', { userType: userType, course: item })}>
            <CourseItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )

}