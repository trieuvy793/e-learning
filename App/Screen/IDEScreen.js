import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import IdeSuper from '../Components/IDE/IdeSuper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { CreateNewProject } from '../Services';

export default function IDEScreen() {
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const navigate = useNavigation();

  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9_]/g, '_').toLowerCase();
  };
  
  const saveProject = async () => {
    if (fileName) {
      try {
        const sanitizedFileName = sanitizeInput(fileName);
        const projectSlug = `${sanitizedFileName}-slug`;
        await CreateNewProject(sanitizedFileName, projectSlug, code); 
        setModalVisible(false);
        setFileName('');
        Alert.alert('Success', 'Project saved successfully!');
      } catch (error) {
        console.error('Error saving project:', error);
        Alert.alert('Error', 'Failed to save project: ${error.message}. Please try again.');
      }
    } else {
      Alert.alert('Validation', 'Please enter a file name');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>IDE</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <IdeSuper initialValue={code} onCodeChange={setCode} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter File Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFileName}
              value={fileName}
              placeholder="File Name"
            />
            <TouchableOpacity style={styles.button} onPress={saveProject}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFF',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#354573',
    paddingHorizontal: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    padding: 20,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2FAFF',
    borderWidth:1,
    borderColor:'#208BE8',
    borderRadius: 20,
    paddingHorizontal: '10%',
    paddingVertical:20,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
  input: {
    height: 40,
    borderColor: 'rgb(229 231 235)',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 60,
  },
  button: {
    backgroundColor: '#C6D6FF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  buttonClose: {
    backgroundColor: 'rgb(229 231 235)',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    width:90
  },
});
