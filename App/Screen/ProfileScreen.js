import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
// import { useClerk, useUser } from "@clerk/clerk-expo";
import Colors from '../../assets/colors/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UpdateUserDetail, getUserDetail } from '../Services';

export default function ProfileScreen() {
  // const { signOut } = useClerk();
  const { user } = useUser();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(user?.imageUrl);

  // useEffect(() => {
  //   if (isFocused || refreshing) {
  //     GetUserDetails();
  //   }
  // }, [isFocused, refreshing])

  // const GetUserDetails = () => {
  //   getUserDetail(user.primaryEmailAddress.emailAddress).then(resp => {
  //     if (user.primaryEmailAddress.emailAddress === resp.userDetail.email) {
  //       setNewFullName(resp.userDetail.userName);
  //       // console.log(resp.userDetail.userName);
  //     }
  //   })
  // }

  const [newFullName, setNewFullName] = useState(newFullName);

  // useEffect(() => {
  //   // console.log(newFullName);
  // }, [newFullName]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // const newImageUrl = useContext(UserImageContext);

  // const newFullName = fullNameContext ? fullNameContext[0] : user.fullName;
  // const newImageUrl = imageUrlContext ? imageUrlContext[0] : user.imageUrl;

  return (
    <ScrollView
      className="bg-BACKGROUND h-full"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Text className="text-center mt-4 text-xl">My Profile</Text>
        <View className="flex-row justify-center mt-4 relative">
          <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 100 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate('change-info',
              {
                user: newFullName
              }
            )}
            className="absolute bottom-0 right-40 bg-white p-1 rounded-full">
            <MaterialCommunityIcons name="lead-pencil" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <Text className="text-center text-xl mt-4" style={{ fontWeight: 'bold' }}>{newFullName}</Text>
        <Text className="text-center mt-2">{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View>
        <View className="mt-8 p-6">
          <TouchableOpacity
            onPress={() => navigation.navigate('my-projects')}
            className="flex-row justify-between items-center bg-white p-3 rounded-xl">
            <View className="flex-row gap-2 items-center">
              <AntDesign name="folderopen" size={20} color="black" />
              <Text className="text-base">My Projects</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('leader-board')}
            className="flex-row justify-between items-center bg-white p-3 rounded-xl mt-6">
            <View className="flex-row gap-2 items-center">
              <SimpleLineIcons name="chart" size={20} color="black" />
              <Text className="text-base">Leader Board</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('payment-policy')}
            className="flex-row justify-between items-center bg-white p-3 rounded-xl mt-6">
            <View className="flex-row gap-2 items-center">
              <SimpleLineIcons name="present" size={20} color="black" />
              <Text className="text-base">Payment Policy</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            className="flex-row justify-between items-center bg-LIGHT-RED p-3 rounded-xl mt-6"
          >
            <View className="flex-row gap-2 items-center">
              <Ionicons name="exit-outline" size={24} color="black" />
              <Text className="text-base">Sign out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>

  );
}
