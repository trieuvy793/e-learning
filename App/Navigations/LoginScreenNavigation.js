import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../Screen/LoginScreen';
import SignupScreen from '../Screen/SignupScreen';

const Stack = createStackNavigator();

export default function LoginScreenNavigation() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Singup' component={SignupScreen}/>
    </Stack.Navigator>
  )
}