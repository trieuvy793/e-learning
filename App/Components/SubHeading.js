import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

export default function SubHeading({text,color=Colors.BLACK}) {
  return (
    <View>
      <Text style={{
        fontSize:24, fontWeight:"bold",
        color:color, marginBottom:5
      }}>{text}</Text>
    </View>
  )
}