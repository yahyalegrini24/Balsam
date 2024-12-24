import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useRole} from '../hooks/useRole'
import PatientNavigator from '../navigation/PatientNavigator'
import AuthNavigator from '../navigation/AuthNavigator'



const Stack = createNativeStackNavigator();

const AppNavigator =()=>{
    const {role}=useRole();
    return(
     <Stack.Navigator screenOptions={{headerShown:false}}>
         {role === 'patient' ? (
        <Stack.Screen name="PatientNavigator" component={PatientNavigator} />
      ) : (
        <Stack.Screen name="AuthNavigator" component={AuthNavigator} />  
      )}
     </Stack.Navigator>

    );
}
export default AppNavigator;