import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import MyCourse from '../Screen/MyCourse';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import ChatbotScreen from '../Screen/ChatbotScreen';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarStyle: {backgroundColor: "#E9EFFF"}
    }}>
      <Tab.Screen name='home' component={HomeScreen}
      options={{
        tabBarIcon:({color, size})=> (
          <AntDesign name="home" size={22} color={color} />
        )
      }}
      />
      <Tab.Screen name='my-course' component={MyCourse}
      options={{
        tabBarIcon:({color, size})=> (
          <AntDesign name="book" size={22} color={color} />
        )
      }}
      />
      <Tab.Screen name='leader-board' component={LeaderBoard}
      options={{
        tabBarIcon:({color, size})=> (
          <SimpleLineIcons name="chart" size={22} color={color} />
        )
      }}
      />
      <Tab.Screen name='profile' component={ProfileScreen}
      options={{
        tabBarIcon:({color, size})=> (
          <AntDesign name="user" size={22} color={color} />
        )
      }}
      />
      <Tab.Screen name='chatbot' component={ChatbotScreen}
      options={{
        tabBarIcon:({color, size})=> (
          <Ionicons name="chatbubble-ellipses-outline" size={22} color={color} />
        )
      }}
      />
    </Tab.Navigator>
  )
}