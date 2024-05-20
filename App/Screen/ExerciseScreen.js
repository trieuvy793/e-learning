import { View, Text, TouchableOpacity, RefreshControl, ScrollView, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllExcercises } from '../Services';
import { Feather } from '@expo/vector-icons';
import { setExercises, setLevel } from '../Redux/actions';

export default function ExerciseScreen() {
  const navigate = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const excerciseList = useSelector(state => state.exercises);
  const level = useSelector(state => state.level);
  const [selectedButton, setSelectedButton] = useState('Basic'); 

  useEffect(() => {
    if (isFocused || refreshing) {
      getAllExcercises();
    }
  }, [isFocused, refreshing]);

  const getAllExcercises = async () => {
    try {
      const resp = await GetAllExcercises();
      dispatch(setExercises(resp?.exercises || []));
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const renderExercises = () => {
    return (
      <FlatList
        data={excerciseList.filter(item => item.level === level)}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} className="mb-4 bg-white px-4 py-3 rounded">
            <Text className="text-lg">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View className="bg-BACKGROUND h-full pt-2">
      <View className="flex-row items-center justify-between border-gray-200" style={{ borderBottomWidth: 1 }}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Feather name="x" size={24} color="black" style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
        <Text className="text-xl pb-2">Exercises</Text>
        <Text className="px-4"></Text>
      </View>
      <View className="flex-row justify-between mx-8 mt-4">
        <TouchableOpacity
          onPress={() => {
            dispatch(setLevel('Basic'));
            setSelectedButton('Basic');
          }}
          className={`bg-white rounded-3xl border ${selectedButton === 'Basic' ? 'border-[#208BE8]' : 'border-gray-200'} py-2 w-2/5`}
        >
          <Text className="text-center text-lg">Basic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(setLevel('Advance'));
            setSelectedButton('Advance');
          }}
          className={`bg-white rounded-3xl border ${selectedButton === 'Advance' ? 'border-[#208BE8]' : 'border-gray-200'} py-2 w-2/5`}
        >
          <Text className="text-center text-lg">Advance</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-4 mx-8">
          {renderExercises()}
      </View>
    </View>
  );
}