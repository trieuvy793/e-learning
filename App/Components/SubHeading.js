import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../assets/colors/Colors'

export default function SubHeading({text,color="#435C9D"}) {
  return (
    <View>
      <Text className="text-lg mb-1" style={{color:color}}
      // style={{
      //   fontSize:24, fontWeight:"bold",
      //   color:color, marginBottom:5
      // }}
      >{text}</Text>
    </View>
  )
}