import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header.js'
import Colors from '../Utils/Colors.js'

export default function HomeScreen() {
  return (
    <View>
      <View style={{backgroundColor:Colors.PRIMARY, height:250, padding:20}}>
      <Header/>
      </View>
      
    </View>
  )
}