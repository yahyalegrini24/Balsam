// src/screens/AuthScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Auth Screen</Text>
      <Button
        title="Go to Patient Screen"
        onPress={() => 
        {
          navigation.navigate('PatientNavigator')
          console.log('you are enter ')
        }
        }  // Assuming the PatientNavigator is set up
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AuthScreen;
