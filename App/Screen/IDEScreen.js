import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import IdeSuper from '../Components/IDE/IdeSuper'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function IDEScreen() {
  const [code, setCode] = useState('');
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>IDE</Text>
        <TouchableOpacity>
          <Feather name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <IdeSuper initialValue={code} onCodeChange={setCode} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFF'
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#354573',
    paddingHorizontal: 10
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    padding: 20,
    color: 'white'
  }
});