import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useClerk } from "@clerk/clerk-expo";
import Colors from '../Utils/Colors';

export default function ProfileScreen() {
  const navigate = useNavigation();
  const { signOut } = useClerk(); 

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={() => signOut()} 
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 20,
          borderRadius: 50
        }}>
        <Text style={{ color: Colors.WHITE, textAlign: 'center', fontSize: 20 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
