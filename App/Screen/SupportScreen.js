import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Bot from './../../assets/images/bot.png'
import Global from './../../assets/images/global-communication.png'
import IDE from './../../assets/images/programming.png'
import { useNavigation } from '@react-navigation/native'

export default function SupportScreen() {
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, flexDirection: 'row', paddingTop: 80, justifyContent: 'space-evenly' }}>
        <TouchableOpacity onPress={() => navigate.navigate('bot-screen')} style={styles.boxBot}>
          <Image source={Bot} style={styles.image} />
          <Text style={styles.textBot}>Chat with AI assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate.navigate('global-screen')} style={styles.boxBot}>
          <Image source={Global} style={styles.image} />
          <Text style={styles.textGlobal}>Chat global</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'white', height: '100%' }}>
        <TouchableOpacity onPress={() => navigate.navigate('ide-screen')} style={styles.boxIDE}>
          <Image source={IDE} style={styles.imageIDE} />
          <Text style={styles.textIDE}>IDE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFF'
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    padding: 20
  },
  boxBot: {
    backgroundColor: '#F2FAFF',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: '#007BE5',
    borderWidth: 0.9,
    width: 180
  },
  boxIDE: {
    backgroundColor: '#F6E8E8',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    borderColor: '#FF5F54',
    borderWidth: 0.9,
    marginHorizontal: 18,
    marginTop: 18
  },
  image: {
    height: 90,
    width: 90,
    marginTop: 20,
    marginBottom: 20
  },
  imageIDE: {
    height: 120,
    width: 120,
    marginTop: 20,
    marginBottom: 20
  },
  textBot: {
    fontSize: 18,
    marginBottom: 14,
    paddingTop: 14,
    borderTopWidth: 0.9,
    borderColor: '#007BE5',
    width: '100%',
    textAlign: 'center'
  },
  textGlobal: {
    fontSize: 18,
    marginBottom: 14,
    paddingTop: 14,
    borderTopWidth: 0.9,
    borderColor: '#007BE5',
    width: '100%',
    textAlign: 'center'
  },
  textIDE: {
    fontSize: 18,
    marginBottom: 14,
    paddingTop: 14,
    borderTopWidth: 0.9,
    borderColor: '#FF5F54',
    width: '100%',
    textAlign: 'center'
  }
});