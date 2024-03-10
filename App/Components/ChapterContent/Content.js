import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { FlatList } from 'react-native-gesture-handler'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Content({content}) {

  let contentRef;
  const navigation=useNavigation();
  const [activeIndex,setActiveIndex]=useState(0);
  const onNextBtnPress=(index)=>{
    if(content?.length<=index+1){
      navigation.goBack();
      return;
    }
    setActiveIndex(index+1);
    contentRef.scrollToIndex({animated:true,index:index+1})
  }
  return (
    <View>
      <ProgressBar contentLength={content?.length}
      contentIndex={activeIndex}/>
      
      <FlatList
        data={content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>{
          contentRef=ref
        }}
        renderItem={({item,index})=>(
          <View style={{width:Dimensions.get('screen').width,padding:20}}>
            <Text style={{
              fontSize:22,marginTop:5,fontWeight:'500'
            }}>{item.heading}</Text>
            <ContentItem description={item?.description?.html} output={item?.output?.html}/>

            <TouchableOpacity
            style={{marginTop:10}}
            onPress={()=>onNextBtnPress(index)}
            >
              <Text style={{padding:15,backgroundColor:Colors.PRIMARY,color:Colors.WHITE,borderRadius:10,textAlign:'center',fontSize:17}}>
                {
                  content?.length>index+1?'Next':'Finish'
                }
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}