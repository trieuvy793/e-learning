// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import IdeSuper from '../Components/IDE/IdeSuper'
// import { Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { setProject } from '../Redux/actions';
// import { UpsertProject } from '../Services';

// export default function IDEScreen() {
//   const [code, setCode] = useState('');
//   const navigate = useNavigation();
//   const project = useSelector(state => state.project);

//   console.log(code);
//   const saveProject = () => {
//     UpsertProject()
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerBox}>
//         <TouchableOpacity onPress={() => navigate.goBack()}>
//           <Feather name="x" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.header}>IDE</Text>
//         <TouchableOpacity>
//           <Feather name="save" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//       <IdeSuper initialValue={code} onCodeChange={setCode} />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2FAFF'
//   },
//   headerBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#354573',
//     paddingHorizontal: 10
//   },
//   header: {
//     textAlign: 'center',
//     fontSize: 26,
//     padding: 20,
//     color: 'white'
//   }
// });

// import các thư viện cần thiết và các hàm dịch vụ
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
  const project = useSelector(state => state.project);
  let projectSlug = "";

  const saveProject = async() => {
    if (fileName) {
      try {
        projectSlug = `${fileName}-slug`;
        await CreateNewProject(fileName, projectSlug, code);
        setModalVisible(false);
        setFileName('');
        Alert.alert('Success', 'Project saved successfully!');
      } catch (error) {
        console.error('Error saving project:', error);
        Alert.alert('Error', 'Failed to save project. Please try again.');
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    width: '80%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#354573',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    width: '80%',
  },
  buttonClose: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
