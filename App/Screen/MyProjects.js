import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, TextInput, ScrollView, RefreshControl, FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { GetProjects, deleteProject, updateProjectName } from '../Services';

export default function MyProjects() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused || refreshing) {
      getProjectName();
    }
  }, [isFocused, refreshing]);

  const getProjectName = () => {
    GetProjects().then(resp => {
      setProjects(resp?.projects || []);
    })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleDelete = () => {
    const folderSlug = selectedProject.projectSlug;
    Alert.alert('Delete', `Are you sure you want to delete ${selectedProject.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteFolder(folderSlug) }
    ]);
  };

  const deleteFolder = (folderSlug) => {
    deleteProject(folderSlug).then(resp => {
      setModalVisible(false);
      getProjectName();
    })
      .catch(error => {
        console.error('Error deleting project:', error);
        Alert.alert('Error', 'Failed to delete the project. Please try again.');
      });
  };

  const handleUpdate = () => {
    if (newFolderName.trim()) {
      console.log(`Updating project name to: ${newFolderName}`);
      updateProjectName(newFolderName, selectedProject.projectSlug)
        .then(() => getProjectName());
      setNewFolderName('');
      setModalVisible(false);
    } else {
      Alert.alert('Update', 'Folder name cannot be empty');
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // console.log(projects)

  return (
    <View className="bg-BACKGROUND h-full">
      <View className="flex-row justify-between mt-2 pb-2 border-gray-200 border-b mb-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="black" style={{ paddingLeft: 12 }} />
        </TouchableOpacity>
        <Text className="text-xl">MyProjects</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ide', { description: "", isNew: true })}>
          <AntDesign name="pluscircleo" size={24} color="black" style={{ paddingRight: 12 }} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 5 }}
      >
        {projects.map((project, index) => (
          <View key={index} className="flex-row items-center justify-between mb-5 px-3">
            <TouchableOpacity className="flex-row items-center gap-5" onPress={() => {
              setSelectedProject(project);
              navigation.navigate('ide', { projectName: project.name, description: project.description, projectSlug: project.projectSlug, isNew: false });
            }}>
              <AntDesign name="folder1" size={30} color="black" />
              <Text className="text-[22px]">{project.name}</Text>
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
          <View style={{
            width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#208BE8', alignItems: 'center'
          }}>
            <Text style={{ marginBottom: 15, fontSize: 20 }}>What would you like to do?</Text>
            <TouchableOpacity
              style={{ marginBottom: 15, marginTop: 6, flexDirection: 'row', alignItems: 'center' }}
              onPress={handleDelete}
            >
              <AntDesign name="delete" size={22} color="#FF5F54" />
              <Text style={{ marginLeft: 10, fontSize: 16, color: '#FF5F54' }}>Delete</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 15, flexDirection: 'row', alignItems: 'baseline' }}>
              <TextInput
                placeholder="Update folder name"
                value={newFolderName}
                onChangeText={setNewFolderName}
                style={{ borderBottomWidth: 1, flex: 1, marginRight: 10 }}
              />
              <TouchableOpacity onPress={handleUpdate}>
                <AntDesign name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}