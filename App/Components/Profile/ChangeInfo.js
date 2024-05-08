import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { UpdateUserDetail, getUserDetail } from '../../Services';
import { UserNameContext } from '../../Context/UserNameContext';
import { UserImageContext } from '../../Context/UserImageContext';

export default function ChangeInfo() {
  const param = useRoute().params;
  const { user } = useUser();
  const navigate = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused || refreshing) {
      GetUserDetails();
    }
  }, [isFocused, refreshing])
  

  const GetUserDetails = () => {
    getUserDetail(user.primaryEmailAddress.emailAddress).then(resp => {
      if (user.primaryEmailAddress.emailAddress === resp.userDetail.email) {
        setNewFullName(resp.userDetail.userName);
      }
    })
  }

  const [newFullName, setNewFullName] = useState(newFullName);
  // const [newImageUrl, setNewImageUrl] = useState(user?.imageUrl);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(()=>{
  //   console.log(param.user.emailAddress);
  // },[param])

  const handleSaveInfo = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      UpdateUserInfo();
      navigate.goBack();
    }, 2000);
  };

  const UpdateUserInfo = () => {
      UpdateUserDetail(user.primaryEmailAddress.emailAddress, user?.imageUrl, newFullName);
  }

  return (
    <View className="bg-BACKGROUND h-full pt-2">
      <View className="flex-row justify-between border-gray-200" style={{ borderBottomWidth: 1 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="black" style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
        <Text className="text-xl pb-2">Change Information</Text>
        <Text className="px-4"></Text>
      </View>
      <View className="mt-2">
        <View className="flex-row justify-center mt-4 relative">
          <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 100 }} />
          <TouchableOpacity
            onPress={() => navigate.navigate('change-info')}
            className="absolute bottom-0 right-40 bg-white p-1 rounded-full">
            <SimpleLineIcons name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-6">
        <View>
          <Text className="ml-2 mb-1 color-SECONDARY text-lg">Name</Text>
          <TextInput 
            className="bg-white w-full p-4 rounded-xl text-lg" 
            onChangeText={(text) => setNewFullName(text)}
            refreshing={refreshing}
            >
              {newFullName}
          </TextInput>
        </View>
        <View className="mt-4">
          <Text className="ml-2 mb-1 color-SECONDARY text-lg">Email</Text>
          <TextInput editable={false} className="w-full p-4 rounded-xl color-SECONDARY text-lg" style={{ backgroundColor: "#EEF0F6" }}>{user?.primaryEmailAddress.emailAddress}</TextInput>
        </View>
      </View>
      <View className="absolute bottom-8 w-full flex-row justify-between">
        <Text></Text>
        <TouchableOpacity
          onPress={handleSaveInfo}
          className="">
          {loading ? (
            <ActivityIndicator />
          ) :
            (<Text className="text-lg bg-SECONDARY-BG p-4 px-10 rounded-lg text-center">SAVE</Text>)}
        </TouchableOpacity>
        <Text></Text>
      </View>
    </View>
  )
}