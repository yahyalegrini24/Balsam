
// src/navigation/AuthNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen"; // Import the AuthScreen

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;



