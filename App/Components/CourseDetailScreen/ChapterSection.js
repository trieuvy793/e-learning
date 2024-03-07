import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function ChapterSection({chapterList,userEnrolledCourse}) {
  return chapterList&&(
    <View style={{padding:10,backgroundColor:Colors.WHITE,marginTop:20,borderRadius:15}}>
      <Text style={{fontWeight:'bold',fontSize:22}}>Chapters</Text>
      {chapterList.map((item,index)=>(
        <View key={index} style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15,borderWidth:1,borderRadius:10,marginTop:10}}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:10}}>
          <Text style={{fontSize:27,fontWeight:'bold'}}>{index+1}</Text>
          <Text style={{fontSize:21}}>{item.title}</Text>
        </View>
        {userEnrolledCourse.length==0?<Ionicons name="lock-closed" size={25} color="black"/>
        :<Ionicons name="play" size={25} color="black"/>}
        </View>
      ))}
    </View>
  )
}