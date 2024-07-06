import { View, Text, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import Snow from '../Components/Animated/Snow'
import snowMan from './../../assets/images/snowman.png'
import UserInput from '../Components/InputField/UserInput'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../../Configs/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../Redux/actions'

export default function SinginScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (emailValidation && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password).then((userCred) => {
        if (userCred) {

          getDoc(doc(firestoreDB, 'users', userCred?.user.uid)).then((docSnap) => {
            if(docSnap.exists()) {
              console.log("user data:", docSnap.data())
              dispatch(SET_USER(docSnap.data()))
            } 
          })

          
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        if(error.message) {
          setAlert(true);
          setAlertMessage("Your email or password is incorrect!");
        }

        setInterval(() => {
          setAlert(false);
        }, 2000)
        
      })
    }
  }

  return (
    <View className="bg-LIGHT-PRIMARY w-full h-full relative">
      <View>
        {/* <Snow></Snow> */}
        <View className="flex flex-row top-10 justify-center">
          <Text className="text-RED text-5xl">Snow</Text>
          <Text className="text-5xl">Code</Text>
        </View>
        <View className="top-10 mx-12">
          <Text className="italic text-SECONDARY text-center w-full">The technology you use impresses no one. The experience you create with it is everything.</Text>
          <Text className="italic text-SECONDARY text-center">- Sean Gerety -</Text>
        </View>
      </View>

      <View className="bg-PRIMARY w-full h-full absolute top-1/4 rounded-full">
        <View className="flex items-center bottom-2">
          <Image source={snowMan} className="w-28 h-28 top-7" />
          <Text className="text-white mt-10 text-base">Welcome back !</Text>
        </View>


        <View className="flex-1 mx-10">
          {alert && (
            <Text className="text-base text-RED text-center">{alertMessage}</Text>
          )}

          <UserInput
            placeholder="Email"
            isPass={false}
            setStatValue={setEmail}
            setEmailValidation={setEmailValidation}
          />

          <UserInput
            placeholder="Password"
            isPass={true}
            setStatValue={setPassword}
          />

          <TouchableOpacity onPress={handleLogin} className="w-full px-4 py-2 rounded-xl bg-SECONDARY-GREEN flex items-center justify-center my-3">
            <Text className="py-2 text-white font-semibold">Login</Text>
          </TouchableOpacity>

          <View className="w-full py-3 flex-row items-center justify-center gap-2">
          <Text className="text-white">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('create-account')}>
            <Text className="font-bold text-SECONDARY-GREEN">Create here</Text>
          </TouchableOpacity>
        </View>
        </View>

      </View>
    </View>
  )
}