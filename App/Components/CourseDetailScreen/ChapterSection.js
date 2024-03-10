import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({chapterList,userEnrolledCourse}) {
  
  const navigate = useNavigation();
  const OnChapterPress=(content)=>{
    if (userEnrolledCourse.length==0) {
      ToastAndroid.show('Please enroll course', ToastAndroid.LONG);
      return;
    } else {
      navigate.navigate('chapter-content', {
        content:content
      });
    }
  }
  return chapterList&&(
    <View style={{padding:10,backgroundColor:Colors.WHITE,marginTop:20,borderRadius:15}}>
      <Text style={{fontWeight:'bold',fontSize:22}}>Chapters</Text>
      {chapterList.map((item,index)=>(
        <TouchableOpacity key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,borderWidth:1,borderRadius:10,marginTop:10}}
        onPress={()=>OnChapterPress(item.content)}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
          <Text style={{fontSize:27,fontWeight:'bold'}}>{index+1}</Text>
          <Text style={{fontSize:21}}>{item.title}</Text>
        </View>
        {userEnrolledCourse.length==0?<Ionicons name="lock-closed" size={25} color="black"/>
        :<Ionicons name="play" size={25} color="black"/>}
        </TouchableOpacity>
      ))}
    </View>
  )
}