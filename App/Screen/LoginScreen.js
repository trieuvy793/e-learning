import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import pythonIcon from './../../assets/images/python-icon.png'
import cppIcon from './../../assets/images/cpp-icon.png'
import javaIcon from './../../assets/images/java-icon.png'
import phpIcon from './../../assets/images/php-icon.png'
import jsIcon from './../../assets/images/js-icon.png'
import snowMan from './../../assets/images/snowman.png'
import google from './../../assets/images/google.webp'
import Snow from '../Components/Animated/Snow'
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser'
// import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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

      <View className="bg-PRIMARY w-full h-full absolute top-1/4 rounded-full">
        <View className="flex items-center bottom-2">
          <Image source={snowMan} className="w-44 h-44 top-7" />
          <View className="flex flex-row gap-20 top-12">
            <Image source={javaIcon} className="w-16 h-16" />
            <Image source={cppIcon} className="w-14 h-14 top-4" />
            <Image source={jsIcon} className="w-12 h-12 top-4" />
          </View>
          <View className="flex flex-row gap-20 top-14">
            <Image source={pythonIcon} className="w-12 h-12 top-5" />
            <Image source={phpIcon} className="w-16 h-16 top-4" />
          </View>
        </View>


        <TouchableOpacity 
        onPress={onPress}
        className="absolute left-0 right-0 bottom-1/3 mx-12 py-3 h-fit bg-white flex flex-row justify-evenly items-center rounded-2xl">
          <Image source={google} className="w-10 h-10" />
          <Text className="text-center text-xl">Sign in with Google</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}