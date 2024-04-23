import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function MyProjects() {
  const navigate = useNavigation();

  return (
    <View>
      <View className="flex-row justify-between mt-2 pb-2 border-gray-200" style={{borderBottomWidth:1}}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="black" style={{ paddingLeft: 12 }} />
        </TouchableOpacity>
        <Text className="text-xl">MyProjects</Text>
        <TouchableOpacity>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ paddingRight: 12 }}/>
        </TouchableOpacity>
      </View>
      <View></View>
    </View>
  )
}