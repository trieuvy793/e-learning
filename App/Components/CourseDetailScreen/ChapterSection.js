import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({ chapterList, userEnrolledCourse, exercises }) {
  const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext);
  const navigate = useNavigation();
  let completedChapter = userEnrolledCourse[0]?.completedChapter?.length;

  const OnChapterPress = (chapter) => {
    if (userEnrolledCourse.length == 0) {
      ToastAndroid.show('Please enroll course', ToastAndroid.LONG);
      return;
    } else {
      setIsChapterComplete(false);
      navigate.navigate('chapter-content', {
        content: chapter.content,
        chapterId: chapter.id,
        userCourseRecordId: userEnrolledCourse[0]?.id
      });
    }
  }

  const checkIsChapterCompleted = (chapterId) => {
    if (userEnrolledCourse[0]?.completedChapter?.length <= 0) {
      return false;
    }
    const resp = userEnrolledCourse[0]?.completedChapter.find(item => item.chapterId == chapterId);
    return resp;
  }

  // const findIndexChapterCompleted = (chapterId) => {
  //   const chapterIndex = chapterList.findIndex(item => item.id === chapterId);

  //   if (chapterIndex === -1 || chapterIndex === 0) {
  //     return false;
  //   }

  //   for (let i = 0; i < chapterIndex; i++) {
  //     const chapterIdToCheck = chapterList[i].id;
  //     const isCompleted = userEnrolledCourse[0]?.completedChapter.some(item => item.chapterId === chapterIdToCheck);
  //     if (!isCompleted) {
  //       return false; 
  //     }
  //   }
  //   return true; 
  // }

  return chapterList && (
    <View className="mt-2">
      <View className="flex flex-row items-center gap-2">
        <Text className="text-xl">Chapter</Text>
        {userEnrolledCourse.length == 0
          ? <Text className="text-xl text-blue-400">0/{chapterList.length}</Text>
          : <Text className="text-xl text-blue-400">{completedChapter}/{chapterList.length}
          </Text>}
      </View>
      <View className="bg-white mt-3 rounded-2xl">
        {chapterList.map((item, index) => (
          <View key={item.id} className={index + 1 != chapterList.length ? "mx-6 mt-5 pb-4 border-b border-gray-200" : "mx-6 mt-4 pb-4"}>
            <TouchableOpacity className="flex flex-row items-center justify-between"
              disabled={index > completedChapter ? true : false}
              onPress={() => OnChapterPress(item)}>
              <View className="flex flex-row items-center gap-2">
                {checkIsChapterCompleted(item.id)
                  ? <Ionicons name="play-circle" size={34} color="#32C48D" />
                  : <Ionicons name="play-circle-outline" size={34} color="black" />}
                <Text className="text-xl">{index + 1}. {item.title}</Text>
              </View>

              {userEnrolledCourse.length == 0
                ? <Ionicons name="lock-closed" size={16} color="#FFD200" />
                : index < completedChapter
                  ? <Ionicons name="checkmark-circle" size={24} color="#32C48D" />
                  : index == completedChapter
                    ? <Ionicons name="play-outline" size={20} />
                    : <Ionicons name="lock-closed" size={16} color="#FFD200" />}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        {chapterList.length == completedChapter ?
          <TouchableOpacity className="flex-row justify-center py-5"
            onPress={() => navigate.navigate('exercise', {data:exercises})}>
            <Text className="text-lg">Review the lesson with </Text>
            <Text className="color-[#208BE8] font-bold underline text-lg">Exercises</Text>
          </TouchableOpacity> : ""}
      </View>
    </View>
  )
}