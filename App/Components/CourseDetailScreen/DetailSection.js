import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import OptionItem from './OptionItem';
import Colors from '../../../assets/colors/Colors';
import { useNavigation } from '@react-navigation/native';
import PaymentPolicy from '../../Screen/PaymentPolicy';

export default function DetailSection({ userType, course, description, enrollCourse, userEnrolledCourse }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleEnrollCourse = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      enrollCourse();
      description.setShowDescription(false);
    }, 2000);
  };

  return (
    <View className="p-3">
      <Image source={{ uri: course?.banner?.url }} className="w-full h-56 rounded-2xl" />
      <View className="mt-1">
        <Text className="text-xl">{course?.name}</Text>
        <OptionItem icon={'person-circle-outline'} value={"Created by " + course.author} />
        <View className="flex flex-row justify-between">
          <OptionItem icon={'time-outline'} value={course.time} />
          <Text style={{ color: course.level == 'Basic' ? '#32C48D' : '#FF5F54', fontSize: 24 }}>{course.level == 'Basic' ? 'Free' : ''}</Text>
        </View>
      </View>
      {description.showDescription && <View className="mt-4">
        <Text className="text-sm text-justify">{course?.description?.markdown}</Text>
      </View>}
      <View className="flex flex-row justify-between">
        <TouchableOpacity className="mt-4 bg-LIGHT-PINK py-4 px-9 rounded-2xl" onPress={() => description.showDescription ? description.setShowDescription(false) : description.setShowDescription(true)}>
          <Text className="text-base">Description</Text>
        </TouchableOpacity>
        {
          userEnrolledCourse?.length === 0 ? (
            userType.userType == "Basic" ? (
              course.level == "Advance" ? (
                <TouchableOpacity
                  style={{ marginTop: 16, backgroundColor: '#C6D6FF', paddingVertical: 16, paddingHorizontal: 36, borderRadius: 16 }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text className="text-base">Enroll Course</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleEnrollCourse}
                  className={`mt-4 bg-SECONDARY-BG py-4 px-9 rounded-2xl ${loading ? 'opacity-50' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text className="text-base">Enroll Now</Text>
                  )}
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={handleEnrollCourse}
                className={`mt-4 bg-SECONDARY-BG py-4 px-9 rounded-2xl ${loading ? 'opacity-50' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className="text-base">Enroll Now</Text>
                )}
              </TouchableOpacity>
            )
          ) : (
            <View className="flex flex-row mt-4 bg-LIGHT-PRIMARY py-4 px-9 rounded-2xl">
              <Text className="text-base">Course Enrolled</Text>
            </View>
          )
        }

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You need to pay for this course!</Text>
            <Text style={styles.modalText}>Here are some options</Text>
            <Pressable
              style={[styles.button, styles.buttonOption]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Pay ${course.price}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOption]}
              onPress={() => navigation.navigate('payment-policy')}>
              <Text style={styles.textStyle}>Monthly/yearly payment</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2FAFF',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#208BE8',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 200,
    marginBottom: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonOption: {
    backgroundColor: '#C6D6FF',
  },
  buttonClose: {
    backgroundColor: '#FFD0D0',
  },
  textStyle: {
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18
  },
});
