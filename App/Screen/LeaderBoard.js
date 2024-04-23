import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../Services'
import Colors from '../../assets/colors/Colors';
import Gold from './../../assets/images/golden.png'
import Silver from './../../assets/images/silver.png'
import Bronze from './../../assets/images/bronze.png'
import Congrats from './../../assets/images/congratulation.png'
import Snowflake from './../../assets/images/snowflake.png'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LeaderBoard() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    GetAllUserDetails();
  },[])

  const GetAllUserDetails = () => {
    GetAllUsers().then(resp => {
      resp && setUserList(resp?.userDetails);
    })
  }

  const getOrdinalSuffix = (number) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastTwoDigits = number % 100; 
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return 'th';
    }
    return suffixes[lastTwoDigits % 10] || 'th';
  }

  return (
    <View className="bg-SECONDARY-BG h-full">
      <View className="mb-5 mt-2">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={()=>navigate.goBack()}>
            <Feather name="x" size={24} color="black" style={{paddingLeft:10}}/>
          </TouchableOpacity>
          <Text className="text-xl">Leader Board</Text>
          <Text></Text>
        </View>
        <View className="flex-row items-center gap-3 justify-around mt-1">
          <View>
            <Image source={Snowflake} style={{width:30,height:30}}/>
            <Image source={Snowflake} style={{width:40,height:40,marginLeft:70}}/>
            <Image source={Snowflake} style={{width:20,height:20,marginLeft:14}}/>
          </View>
            <Image source={Congrats} style={{width:120,height:120}}/>
          <View>
            <Image source={Snowflake} style={{width:40,height:40,marginLeft:50}}/>
            <Image source={Snowflake} style={{width:20,height:20,marginRight:70}}/>
            <Image source={Snowflake} style={{width:30,height:30,marginLeft:36}}/>
          </View>
        </View>
      </View>
      <View className="bg-white pb-16" style={{marginBottom:130,borderTopLeftRadius:30,borderTopRightRadius:30}}>
        <FlatList
          data={userList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ScrollView >
              <View className="flex-row items-center justify-between p-4 mt-5 mx-4 rounded-xl border-x border-y border-BLUE">
                <View className="flex-row gap-3 items-center">
                  <Text style={{ fontSize: 16 }}>{index + 1}{getOrdinalSuffix(index + 1)}</Text>
                  <Image source={{ uri: item.profileImage }}
                    style={{ width: 50, height: 50, borderRadius: 50 }} />

                  <View>
                    <Text style={{ fontSize: 20 }}>{item.userName}</Text>
                    <Text style={{ fontSize: 16, color: '#208BE8' }}>{item.point} Points</Text>
                  </View>
                </View>

                {index<3
                ?<Image source={index+1==1?Gold:index+1==2?Silver:Bronze}
                style={{width:40,height:40}}/>
                :null}
              </View>
            </ScrollView>
          )}
        />
      </View>
    </View>
  )
}