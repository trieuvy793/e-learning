import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { firestoreDB } from '../../Configs/firebase.config';

export default function AddToChatScreen() {

  const navigate = useNavigation();
  const user = useSelector((state) => state.user);
  const [addChat, setAddChat] = useState("");

  const createNewChat = async() => {
    let id = `${Date.now()}`

    const _doc = {
      _id: id,
      user: user,
      chatName: addChat
    }

    if (addChat !== "") {
      setDoc(doc(firestoreDB, "chats", id), _doc).then(() => {
        setAddChat("")
        navigate.replace('chat-list')
      }).catch((err) => {
        alert("Error: ", err);
      })
    }
  }

  return (
    <View className="flex-1 bg-BACKGROUND">
      <SafeAreaView>
      <View className="flex-row justify-between items-center px-3 w-full">
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="h-12 w-12 rounded-full border border-SECONDARY-GREEN flex items-center justify-center">
            <Image source={{ uri: user?.user.profilePic }} className="w-full h-full" resizeMode='cover' />
          </TouchableOpacity>
        </View>

        <View className="w-full h-full px-4 mt-6 bg-white rounded-t-[36px]">
          <View className="w-full px-4 py-6">
            <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-[#18A0FB] space-x-3">
              <Ionicons name="chatbubbles" size={24} color="#18A0FB" />

              <TextInput 
                placeholder='Search or Create a chat'
                className="flex-1 text-base text-SECONDARY -mt-2 h-12 w-full"
                value={addChat}
                onChangeText={(text) => setAddChat(text)}/>

              <TouchableOpacity onPress={createNewChat}>
                <Ionicons name="send-sharp" size={24} color="#18A0FB" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}