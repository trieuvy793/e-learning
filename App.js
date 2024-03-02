import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from './App/Screen/LoginScreen';

export default function App() {
  return (
    <ClerkProvider publishableKey={"pk_test_dG9waWNhbC1jYXRmaXNoLTM1LmNsZXJrLmFjY291bnRzLmRldiQ"}>
    <View style={styles.container}>
      
      <SignedIn>
          <Text>You are Signed in</Text>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
