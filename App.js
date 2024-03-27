import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './App/Screen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { UserPointsContext } from './App/Context/UserPointsContext';

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
          <View style={styles.container}>
            <SignedIn>
              <NavigationContainer>
                <TabNavigation />
              </NavigationContainer>
            </SignedIn>
            <SignedOut>
              <LoginScreen />
            </SignedOut>
          </View>
        </CompleteChapterContext.Provider>
      </UserPointsContext.Provider>

    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
});
