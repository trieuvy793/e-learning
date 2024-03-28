import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header.js'
import Colors from '../../assets/colors/Colors.js'
import CourseList from '../Components/HomeScreen/CourseList.js'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services/index.js'
import { UserPointsContext } from '../Context/UserPointsContext.js'
import { GetPoint } from '../Services/getPoint.js'
import CourseProgress from '../Components/HomeScreen/CourseProgress.js'

export default function HomeScreen() {

  const { isLoaded,signOut } = useAuth();
  const {user} = useUser();
  const {userPoints,setUserPoints}=useContext(UserPointsContext);

  useEffect(()=>{
    user&&createUser();
  }, [user])

  const createUser=()=>{
    if(user) 
    {
      createNewUser(user.fullName,user.primaryEmailAddress.emailAddress,user.imageUrl).then(resp=>{
        if(resp)
          GetPoint();
      })
    }
  }

  return (
    <View className="bg-BACKGROUND">
      <View className="p-5 h-52">
        <Header/>
      </View>
      <SafeAreaView>
        <ScrollView style={{marginBottom:380}} showsVerticalScrollIndicator={false}>
          <View style={{ padding: 20 }}>
            <View>
              <CourseProgress/>
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