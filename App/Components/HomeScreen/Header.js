import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../../assets/colors/Colors';
import Coin from './../../../assets/images/coin.png';
import SnowSearch from './../../../assets/images/snowsearch.png'
import { Ionicons } from '@expo/vector-icons';
import { UserPointsContext } from '../../Context/UserPointsContext'
import { GetPoint } from '../../Services/getPoint';

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const point = GetPoint();

  return isLoaded && (
    <View>
      <View className="flex flex-row justify-between mx-3">
        <View className="flex flex-row items-center gap-2">
          <Image source={{ uri: user?.imageUrl }}
            className="h-12 w-12 rounded-full" />
          <View>
            <Text className="text-xs">Welcome Back!</Text>
            <Text className="text-xl">{user?.fullName}</Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-3">
          <Image source={Coin} className="w-8 h-8" />
          <Text>{point}</Text>
        </View>
      </View>

      <View className="bg-SECONDARY-BG w-full h-4/6 mt-5 rounded-3xl flex">
        <View className="mt-4 z-10">
          <Text className="ml-8 text-PRIMARY text-lg">What can I help you?</Text>
          <View className="bg-white mt-5 mx-6 rounded-xl flex flex-row items-center justify-between pr-4">
            <TextInput placeholder='Search here' className="h-10 pl-4" />
            <Ionicons name="search" size={20}/>
          </View>
        </View>
        <View className="z-0flex flex-row justify-end bottom-32">
          <Image source={SnowSearch} className="w-28 h-36"/>
        </View>
      </View>
    </View>
  )
}