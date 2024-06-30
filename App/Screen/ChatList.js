import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../../Configs/firebase.config';

export default function ChatList() {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigation();
  const user = useSelector((state) => state.user);
  // console.log("loggeg:", user)
  const [chats, setChats] = useState(null);

  useLayoutEffect(() => {
    const chatQuery = query(collection(firestoreDB, "chats"), orderBy("_id", "desc"));

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map(doc => doc.data());
      setChats(chatRooms);
      setIsLoading(false);
    })

    // Return the unsubcribe function to stop listening to the updates
    return unsubscribe;
  },[])

  const MessageCard = ({room}) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('chat-room', {room: room})} className="w-full flex-row items-center justify-start py-2">
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-SECONDARY-GREEN p-1 justify-center">
          <FontAwesome5 name="users" size={24} color="black"/>
        </View>

        <View className="flex-1 flex items-start justify-center ml-4">
          <Text className="text-base font-semibold capitalize">{room.chatName}</Text>
          <Text className="text-SECONDARY">How are you?</Text>
        </View>

        <Text className=" text-GREEN">27 mins</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex-1 bg-BACKGROUND pb-10">
      <SafeAreaView>
        <View className="flex-row justify-between items-center px-3 w-full">
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg">Messages</Text>

          <TouchableOpacity className="h-12 w-12 rounded-full border border-SECONDARY-GREEN flex items-center justify-center">
            <Image source={{ uri: user?.user.profilePic }} className="w-full h-full" resizeMode='cover' />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full h-full px-4 mt-6 bg-white rounded-t-[36px]">
          <TouchableOpacity onPress={() => navigate.navigate('add-chat')} className="w-full flex-row justify-end mt-4">
            <Ionicons name="chatbox" size={30} color="grey" />
          </TouchableOpacity>
          {isLoading ? (
            <>
              <View className="w-full flex items-center justify-center">
                <ActivityIndicator size={"large"} color={"#208BE8"} />
              </View>
            </>) : (
            <>
              {chats && chats?.length > 0 ? (<>
              {chats?.map(room => (
                <MessageCard key={room._id} room={room}/>
              ))}
              </>) : (<></>)}

            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}