import { View, Text, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Snow from '../Components/Animated/Snow'
import UserInput from '../Components/InputField/UserInput'
import { useNavigation } from '@react-navigation/native'
// import SinginScreen from './SinginScreen'
import { avatars } from '../Utils/Supports'
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../../Configs/firebase.config'
import { doc, setDoc } from 'firebase/firestore'

export default function CreateAccount() {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  }

  const handleSignUp = async() => {
    if (emailValidation && email !== "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCred) => {
        // console.log(userCred.user);
        const data = {
          _id: userCred?.user.uid,
          fullName: name,
          profilePic: avatar,
          providerData: userCred.user.providerData[0]
        }

        setDoc(doc(firestoreDB, 'users', userCred?.user.uid), data).then(() => {
          navigation.navigate("sign-in");
        })
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
    }
  }

  const navigation = useNavigation();

  return (
    <View className="bg-LIGHT-PRIMARY w-full h-full relative">
      <View>
        <Snow></Snow>
        <View className="flex flex-row top-10 justify-center">
          <Text className="text-RED text-5xl">Snow</Text>
          <Text className="text-5xl">Code</Text>
        </View>
        <View className="top-10 mx-12">
          <Text className="italic text-SECONDARY text-center w-full">The technology you use impresses no one. The experience you create with it is everything.</Text>
          <Text className="italic text-SECONDARY text-center">- Sean Gerety -</Text>
        </View>
      </View>

      {isAvatarMenu && (
        <>
        <View className="absolute inset-0 z-10" style={{width:screenWidth, height:screenHeight}}>
          <ScrollView>
            <BlurView className="px-4 py-16 flex-row flex-wrap items-center justify-evenly"
            tint="light"
            intensity={40}
            style={{width:screenWidth, height:screenHeight}}>
              {avatars?.map((item)=> (
                <TouchableOpacity onPress={() => handleAvatar(item)} key={item._id} className="w-20 m-3 h-20 p-1 rounded-full border-2 border-SECONDARY-GREEN relative">
                  <Image source={{uri: item?.image.asset.url}} className="h-full w-full" resizeMode='contain'/>
                </TouchableOpacity>
              ))}
            </BlurView>
          </ScrollView>
        </View>
      </>
      )}

      <View className="bg-PRIMARY w-full h-full absolute top-1/4 rounded-full">
        <View className="w-full flex items-center justify-center relative top-5">
          <TouchableOpacity onPress={() => setIsAvatarMenu(true)} className="w-20 h-20 p-1 rounded-full border-2 border-SECONDARY-GREEN">
            <Image source={{uri: avatar}} className="w-full h-full" resizeMode='contain'/>
            <View className="w-6 h-6 bg-SECONDARY-GREEN rounded-full absolute top-0 right-0 flex items-center justify-center">
            <MaterialIcons name="edit" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-1 mx-10 my-6">
          <UserInput
            placeholder="Full Name"
            isPass={false}
            setStatValue={setName}
          />

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

          <TouchableOpacity onPress={handleSignUp} className="w-full px-4 py-2 rounded-xl bg-SECONDARY-GREEN flex items-center justify-center my-3">
            <Text className="py-2 text-white font-semibold">Sign up</Text>
          </TouchableOpacity>

          <View className="w-full py-3 flex-row items-center justify-center gap-2">
            <Text className="text-white">Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('sign-in')}>
              <Text className="font-bold text-SECONDARY-GREEN">Login here</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  )
}