import { View, Text, ToastAndroid, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { IsChapterFinished, getUserEnrolledCourse, isCompletedChapter, markChapterCompleted } from '../Services';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import { useUser } from '@clerk/clerk-expo'
import { UserPointsContext } from '../Context/UserPointsContext';

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const { user } = useUser();
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  const navigate = useNavigation();
  const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext);

  //Chapter Id
  //Record Id

  useEffect(() => {
    // console.log("ChapterId",param.chapterId)
    // console.log("RecordId",param.userCourseRecordId)
    // console.log(param)
  }, [param])
  const onChapterFinish = () => {
    isCompletedChapter(param.chapterId, param.userCourseRecordId).then(resp => {
      if (resp.userEnrolledCourse?.completedChapter.length > 0)
      {
        navigate.goBack();
        return;
      }
      const totalPoints = Number(userPoints) + param.content?.length * 10;
      markChapterCompleted(param.chapterId, param.userCourseRecordId, user.primaryEmailAddress.emailAddress, totalPoints).then(resp => {
        if (resp) {
          const updateUserDetail = resp?.updateUserDetail;

          const point = updateUserDetail?.point;
          setUserPoints(point);
          ToastAndroid.show('Course Completed!', ToastAndroid.LONG);
          setIsChapterComplete(true);
          navigate.goBack();
          window.location.reload();
        }
      })
    });  
  }

  return param.content && (
      <Content content={param.content}
        onChapterFinish={() => onChapterFinish()} />
  )
}
