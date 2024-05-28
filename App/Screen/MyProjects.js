import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { GetProjects } from '../Services';

export default function MyProjects() {
  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getProjectName();
  }, []);

  const getProjectName = () => {
    GetProjects().then(resp => {
      setProjects(resp?.projects || []);
      console.log(resp?.projects);
    })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleDelete = () => {
    Alert.alert('Delete', `Are you sure you want to delete ${selectedProject.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => console.log('Folder deleted') }
    ]);
    setModalVisible(false);
  };

  const handleUpdate = () => {
    if (newFolderName.trim()) {
      console.log(`Updating project name to: ${newFolderName}`);
      getProjectName();
      setNewFolderName('');
      setModalVisible(false);
    } else {
      Alert.alert('Update', 'Folder name cannot be empty');
    }
  };

  return (
    <View className="bg-BACKGROUND h-full">
      <View className="flex-row justify-between mt-2 pb-2 border-gray-200" style={{ borderBottomWidth: 1 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="black" style={{ paddingLeft: 12 }} />
        </TouchableOpacity>
        <Text className="text-xl">MyProjects</Text>
        <TouchableOpacity>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ paddingRight: 12 }} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {projects.map((project, index) => (
          <View key={index} className="flex-row items-center justify-between mb-5">
            <TouchableOpacity className="flex-row items-center gap-5" onPress={() => setSelectedProject(project)}>
              <AntDesign name="folder1" size={36} color="black" />
              <Text className="text-2xl">{project.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setSelectedProject(project); setModalVisible(true); }}>
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ marginBottom: 15, fontSize: 18 }}>Options</Text>
            <TouchableOpacity
              style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}
              onPress={handleDelete}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text style={{ marginLeft: 10 }}>Delete</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="New folder name"
                value={newFolderName}
                onChangeText={setNewFolderName}
                style={{ borderBottomWidth: 1, flex: 1, marginRight: 10 }}
              />
              <TouchableOpacity onPress={handleUpdate}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'blue' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}