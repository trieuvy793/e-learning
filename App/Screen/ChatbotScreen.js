import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ChatGPT from '../Components/GPT/ChatGPT'

export default function ChatbotScreen() {
  return (
    <View style={styles.container}>
      <ChatGPT/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
