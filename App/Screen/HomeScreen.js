import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import Header from '../Components/HomeScreen/Header.js'
import Colors from '../../assets/colors/Colors.js'
import CourseList from '../Components/HomeScreen/CourseList.js'
// import { useAuth, useUser } from '@clerk/clerk-expo'
import { createNewUser, getUserDetail } from '../Services/index.js'
import { UserPointsContext } from '../Context/UserPointsContext.js'
import { GetPoint } from '../Services/getPoint.js'
import CourseProgress from '../Components/HomeScreen/CourseProgress.js'
import AllCourseList from '../Components/HomeScreen/AllCourseList.js'
import { getAllCourseList } from './../Services'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function HomeScreen() {

  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const { userPoints, setUserPoints } = useContext(UserPointsContext);
  const [input, setInput] = useState("");
  const isFocused = useIsFocused();
  const [courseList, setCourseList] = useState([]);
  const coursesByLevel = {};
  const [refreshing, setRefreshing] = useState(false);
  const point = GetPoint();

  useEffect(() => {
    user && createUser();
  }, [user])

  const createUser = () => {
    if (!user) {
      createNewUser(user.fullName, user.primaryEmailAddress.emailAddress, user.imageUrl).then(resp => {
        if (resp)
          GetPoint();
      })
    }
    // else {
    //   getUserDetail(user.primaryEmailAddress.emailAddress);
    // }
  }

  const getCourses = () => {
    getAllCourseList().then(resp => {
      setCourseList(resp?.courses);
    })
  }

  useEffect(() => {
    if (isFocused || refreshing) {
      getCourses();
    }
  }, [isFocused, refreshing])

  courseList.forEach(course => {
    if (!coursesByLevel[course.level]) {
      coursesByLevel[course.level] = [];
    }
    coursesByLevel[course.level].push(course);
  });

  // const user2 = useSelector((state)=> state.user);
  // console.log("loggeg:", user2)

  const renderCourses = () => {
    const levels = Object.keys(coursesByLevel);
    return (
      <View>
        {levels.map(level => (
          <View key={level}>
            <CourseList level={level} data={coursesByLevel[level]} refreshing={refreshing} />
          </View>
        ))}
      </View>
    );
  }


  const renderAllCourse = () => (
    <View>
      <AllCourseList data={courseList} input={input} setInput={setInput} />
    </View>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  
  return (
    <View
      className="bg-BACKGROUND"
      >
      <View className="p-5 h-52">
        <Header input={input} point={point} setInput={setInput} />
      </View>
      <ScrollView
        style={{marginBottom:200}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 20 }}>
          {renderAllCourse()}
          <CourseProgress refreshing={refreshing} />
          {renderCourses()}
        </View>
      </ScrollView>

    </View>
  )
}