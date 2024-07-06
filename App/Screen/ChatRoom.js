import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../../Configs/firebase.config';

export default function ChatRoom({ route }) {

  const { room } = route.params;
  // console.log("room", room);
  const user = useSelector((state) => state.user);
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const textInputRef = useRef(null);

  const handleKeyboardOpen = () => {
    if(textInputRef.current) {
      textInputRef.current.focus();
    }
  }

  return (
    <View className="flex-1 bg-BACKGROUND pt-4">
        <View className="flex-row justify-between items-center px-3 w-full">
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg">{room.chatName.length > 26 ? `${room.chatName.slice(0, 26)}..` : room.chatName}</Text>

          <View className="h-12 w-12 rounded-full border border-SECONDARY-GREEN flex items-center justify-center">
            <Image source={{ uri: user?.user.profilePic }} className="w-full h-full" resizeMode='cover' />
          </View>
        </View>

        <View className="w-full h-full px-4 mt-6 bg-white rounded-t-[36px]">
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}>
            <>
              <ScrollView>
                {isLoading ? (
                  <>
                    <View className="w-full flex items-center justify-center">
                      <ActivityIndicator size={"large"} color={"#208BE8"} />
                    </View>
                  </>) : (
                  <>

                  </>)}
              </ScrollView>

              <View className="w-full flex-row items-center justify-center px-8 pb-28">
                <View className="bg-white rounded-[96px] px-4 py-2 space-x-4 flex-row items-center justify-center border border-BLUE">
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Entypo name="emoji-happy" size={24} color="black" />
                </TouchableOpacity>

                <TextInput 
                  className="flex-1 h-8"
                  placeholder='Ask me anything...'
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />

                <TouchableOpacity>
                  <Feather name="mic" size={24} color="black" />
                </TouchableOpacity>
                </View>
                <TouchableOpacity className="pl-4">
                <Ionicons name="send-sharp" size={24} color="#18A0FB" />
                </TouchableOpacity>
                
              </View>
            </>
          </KeyboardAvoidingView>
        </View>

    </View>
  )
}