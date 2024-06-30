import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import SnowMan from "./../../assets/images/snowman.png"
import { firebaseAuth, firestoreDB } from '../../Configs/firebase.config'
import { useNavigation } from '@react-navigation/native'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../Redux/actions'

export default function SplashScreen() {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  },[])

  const checkLoggedUser = async() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred?.uid) {
        getDoc(doc(firestoreDB, 'users', userCred?.uid)).then((docSnap) => {
          if(docSnap.exists()) {
            console.log("user data:", docSnap.data())
            dispatch(SET_USER(docSnap.data()))
          } 
        }).then(() => {
          setTimeout(() => {
            navigation.replace("chat-list")
          }, 2000);
        })
      } else {
        navigation.replace("sign-in")
      }
    })
  }

  return (
    <View className="flex-1 items-center justify-center space-y-24 bg-BACKGROUND">
      <Image source={SnowMan} className="w-40 h-40 justify-center" resizeMode='contain'/>
      <ActivityIndicator size={"large"} color={"#208BE8"}/>
    </View>
  )
}