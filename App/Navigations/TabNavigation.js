import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import MyCourse from '../Screen/MyCourse';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import SupportScreen from '../Screen/SupportScreen';
import ProblemDetailScreen from '../Components/ProblemDetailScreen/ProblemDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MyProjects from '../Screen/MyProjects';
import PaymentPolicy from '../Screen/PaymentPolicy';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyCourseStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Leetcode Excercises" component={MyCourse} />
    <Stack.Screen name="ProblemDetail" component={ProblemDetailScreen} />
  </Stack.Navigator>
);

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#E9EFFF" }
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Leet Code'
        component={MyCourseStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Support'
        component={SupportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={22} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
