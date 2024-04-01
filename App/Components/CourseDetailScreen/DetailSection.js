import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import OptionItem from './OptionItem';
import Colors from '../../../assets/colors/Colors';

export default function DetailSection({ course, description, enrollCourse, userEnrolledCourse }) {
  const [loading, setLoading] = useState(false);

  const handleEnrollCourse = () => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
      enrollCourse();
      description.setShowDescription(false);
    }, 2000); 
  };

  return (
    <View className="p-3">
      <Image source={{ uri: course?.banner?.url }} className="w-full h-56 rounded-2xl"/>
      <View className="mt-1">
        <Text className="text-xl">{course.name}</Text>
        <OptionItem icon={'person-circle-outline'} value={"Created by " + course.author} />
        <View className="flex flex-row justify-between">
          <OptionItem icon={'time-outline'} value={course.time} />
          <Text style={{ color: course.level == 'Basic' ? '#32C48D' : '#FF5F54', fontSize:24 }}>{course.level == 'Basic' ? 'Free' : '$'+course.price}</Text>
        </View>
      </View>
      {description.showDescription&&<View className="mt-4">
        <Text className="text-sm text-justify">{course?.description?.markdown}</Text>
      </View>}
      <View className="flex flex-row justify-between">
        <TouchableOpacity className="flex flex-row mt-4 bg-LIGHT_PINK py-4 px-9 rounded-2xl" onPress={()=>description.showDescription?description.setShowDescription(false):description.setShowDescription(true)}>
          <Text className="text-base">Description</Text>
        </TouchableOpacity>
        {userEnrolledCourse?.length==0 ? (
          <TouchableOpacity
            onPress={handleEnrollCourse}
            className={`flex flex-row mt-4 bg-SECONDARY_BG py-4 px-9 rounded-2xl ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.WHITE} />
            ) : (
              <Text className="text-base">Enroll Now</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View className="flex flex-row mt-4 bg-LIGHT_PRIMARY py-4 px-9 rounded-2xl">
            <Text className="text-base">Course Enrolled</Text>
          </View>
        )}
      </View>
    </View>
  );
}
