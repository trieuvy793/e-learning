import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({chapterList,userEnrolledCourse}) {

  const{isChapterComplete,setIsChapterComplete}=useContext(CompleteChapterContext);

  const navigate = useNavigation();

  const OnChapterPress=(chapter)=>{
    if (userEnrolledCourse.length==0) {
      ToastAndroid.show('Please enroll course', ToastAndroid.LONG);
      return;
    } else {
      setIsChapterComplete(false);
      navigate.navigate('chapter-content', {
        content:chapter.content,
        chapterId:chapter.id,
        userCourseRecordId:userEnrolledCourse[0]?.id
      });
    }
  }

  const checkIsChapterCompleted=(chapterId)=>{
    console.log(userEnrolledCourse)
    if(userEnrolledCourse[0]?.completedChapter?.length<=0){
      return false;
    }
    const resp=userEnrolledCourse[0]?.completedChapter.find(item=>item.chapterId==chapterId);
    return resp;
  }
  return chapterList&&(
    <View style={{padding:10,backgroundColor:Colors.WHITE,marginTop:20,borderRadius:15}}>
      <Text style={{fontWeight:'bold',fontSize:22}}>Chapters</Text>
      {chapterList.map((item,index)=>(
        <TouchableOpacity key={index} style={[checkIsChapterCompleted(item.id)
          ?styles.completeChapter
          :styles.inCompleteChapter]}
        onPress={()=>OnChapterPress(item)}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
          <Text style={[checkIsChapterCompleted(item.id)
            ?{fontSize:27,fontWeight:'bold',color:Colors.GREEN}
            :{fontSize:27,fontWeight:'bold'}]}>{checkIsChapterCompleted(item.id)
            ?<Ionicons name="checkmark-circle" size={30} color={Colors.GREEN}/>
            :index+1}</Text>
          <Text style={[checkIsChapterCompleted(item.id)
            ?{fontSize:21,color:Colors.GREEN}
            :{fontSize:21}]}>{item.title}</Text>
        </View>
        {userEnrolledCourse.length==0
        ?<Ionicons name="lock-closed" size={25} color="black"/>
        :<Ionicons name="play" size={25} color={checkIsChapterCompleted(item.id)?Colors.GREEN:Colors.BLACK}/>}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  inCompleteChapter: {
    display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,borderWidth:1,borderRadius:10,marginTop:10
  },
  completeChapter: {
    display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,borderWidth:1,borderRadius:10,marginTop:10,borderColor:Colors.GREEN,backgroundColor:Colors.LIGHT_GREEN
  }
})
