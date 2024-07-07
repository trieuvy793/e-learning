import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../../assets/colors/Colors';
import { Ionicons } from '@expo/vector-icons';
import CourseProgressBar from './CourseProgressBar';

export default function CourseItem({item,completedChapter}) {
  return (
    <View className="bg-white mr-4 rounded-2xl p-3">
      <Image source={{ uri: item?.banner?.url }}
        style={{ width: 210, height: 120, borderRadius: 15 }} />
      <View style={{ padding: 7 }}>
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Ionicons name="book-outline" size={18} color="black" />
            <Text>{item?.chapters?.length} Chapters</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <Ionicons name="time-outline" size={18} color="black" />
            <Text>{item?.time}</Text>
          </View>
        </View>
        <Text style={{ color: item.price == 0 ? "#32C48D" : "#FF5F54"  }} className="mt-2">
          {item.price == 0 ? 'Free' : ''}
        </Text>
      </View>
      {completedChapter!=undefined
      ?<CourseProgressBar
        totalChapter={item?.chapters?.length}
        completedChapter={completedChapter}
      />
      :null}
    </View>
  )
}