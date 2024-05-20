import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './App/Screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { UserPointsContext } from './App/Context/UserPointsContext';
import { createStackNavigator } from '@react-navigation/stack';
import CourseDetailScreen from './App/Screen/CourseDetailScreen';
import ChapterContentScreen from './App/Screen/ChapterContentScreen';
import LeaderBoard from './App/Screen/LeaderBoard';
import MyProjects from './App/Screen/MyProjects';
import PaymentPolicy from './App/Screen/PaymentPolicy';
import ProfileScreen from './App/Screen/ProfileScreen';
import ChatGlobalScreen from './App/Screen/ChatGlobalScreen';
import ChatGPT from './App/Components/GPT/ChatGPT';
import IDEScreen from './App/Screen/IDEScreen';
import SupportScreen from './App/Screen/SupportScreen';
import ChangeInfo from './App/Components/Profile/ChangeInfo';
import ExerciseScreen from './App/Screen/ExerciseScreen';
import { Provider } from 'react-redux';
import store from './App/Redux/store'

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'lato': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-light': require('./assets/fonts/Lato-Light.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
    'league': require('./assets/fonts/LeagueSpartan-Regular.ttf'),
    'league-light': require('./assets/fonts/LeagueSpartan-Light.ttf'),
    'league-medium': require('./assets/fonts/LeagueSpartan-Medium.ttf'),
    'league-bold': require('./assets/fonts/LeagueSpartan-Bold.ttf'),
    'league-semibold': require('./assets/fonts/LeagueSpartan-SemiBold.ttf'),
  });

  const [userPoints, setUserPoints] = useState();
  const [isChapterComplete, setIsChapterComplete] = useState(false);
  return (
    <ClerkProvider publishableKey={"pk_test_dG9waWNhbC1jYXRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ"}>
      <UserPointsContext.Provider value={{ userPoints, setUserPoints }}>
        <CompleteChapterContext.Provider value={{ isChapterComplete, setIsChapterComplete }}>
          <Provider store={store}>
            <View style={styles.container}>
              <SignedIn>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Group>
                      <Stack.Screen name='Home' component={TabNavigation} />
                      <Stack.Screen name='course-detail' component={CourseDetailScreen} />
                      <Stack.Screen name='chapter-content' component={ChapterContentScreen} />
                      <Stack.Screen name='exercise' component={ExerciseScreen} />
                    </Stack.Group>
                    <Stack.Group>
                      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                      <Stack.Screen name='leader-board' component={LeaderBoard} />
                      <Stack.Screen name='my-projects' component={MyProjects} />
                      <Stack.Screen name='payment-policy' component={PaymentPolicy} />
                    </Stack.Group>
                    <Stack.Group>
                      <Stack.Screen name='ChatbotScreen' component={SupportScreen} />
                      <Stack.Screen name='bot-screen' component={ChatGPT} />
                      <Stack.Screen name='global-screen' component={ChatGlobalScreen} />
                      <Stack.Screen name='ide-screen' component={IDEScreen} />
                      <Stack.Screen name='change-info' component={ChangeInfo} />
                    </Stack.Group>
                  </Stack.Navigator>
                </NavigationContainer>
              </SignedIn>
              <SignedOut>
                <LoginScreen />
              </SignedOut>
            </View>
          </Provider>
        </CompleteChapterContext.Provider>
      </UserPointsContext.Provider>

    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FAFF',
    marginTop: 20
  },
});
