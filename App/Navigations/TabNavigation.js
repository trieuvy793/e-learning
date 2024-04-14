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
import ProblemDetailScreen from '../Components/ProblemDetailScreen/ProblemDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MyCourseStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Leetcode Excercises" component={MyCourse} />
    <Stack.Screen name="ProblemDetail" component={ProblemDetailScreen} />
  </Stack.Navigator>
);

const ChatStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Global Chat" component={ChatbotScreen} />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const LeaderBoardStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
  </Stack.Navigator>
);

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: "#E9EFFF" }
    }}>
      <Tab.Screen name='home' component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen name='my-course' component={MyCourseStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen name='leader-board' component={LeaderBoardStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="chart" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen name='Profile' component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen name='chatbot' component={ChatStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}