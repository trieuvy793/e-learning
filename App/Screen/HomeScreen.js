import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header.js'
import Colors from '../Utils/Colors.js'
import CourseList from '../Components/HomeScreen/CourseList.js'

export default function HomeScreen() {
  return (
    <View>
      <View style={{ backgroundColor: Colors.PRIMARY, height: 200, padding: 20 }}>
        <Header />
      </View>
      <SafeAreaView>
        <ScrollView style={{marginBottom:380}} showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            <View>
              <CourseList level={'Basic'} />
            </View>
            <View>
              <CourseList level={'Advance'} />
            </View>
            <View>
              <CourseList level={'Basic'} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

    </View>
  )
}