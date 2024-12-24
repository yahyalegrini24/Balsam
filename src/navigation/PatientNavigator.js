import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens importation

import GetStarted from '../screens/GetStarted/GetStartedScreen'
import HomePage from '../screens/Patients/HomePage/HomePage'
import ServicesPage from "../screens/Patients/Services/ServicePage";
import ServiceDetailsScreen from "../screens/Patients/Services/ServiceDetails";
import ProfessionalistScreen from "../screens/Patients/Professional/ListProfessional";
import ProfessionalProfile from "../screens/Patients/Professional/ProfessioalProfile";
import BookingsScreen from "../screens/Patients/booking/BookingsScreen";
import BookingDetailsScreen from "../screens/Patients/booking/BokingDetails";
import PaymentScreen from "../screens/Patients/Payment/PaymentScreen";
import MessagesScreen from "../screens/Patients/chat/ChatScreen";
import MessageDetailsScreen from '../screens/Patients/chat/message'
import ClinicListScreen from '../screens/Patients/Clinic/ClinicListPage'
import NearbyProfessionals from "../screens/Patients/Professional/nearbyProfessional";
import NearbyClinic from '../screens/Patients/Clinic/NearbyClinic'
import EmergencyScreen from '../screens/Patients/emergency/EmergencyScreen'
import NotificationScreen from '../screens/Patients/notifications/NotificationsPage'
import ProfileScreen from "../screens/Patients/Profile/Profile";

const Stack=createNativeStackNavigator();

const PatientStack=()=>{ 
    return(
 
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{headerShown:false}}>
        <Stack.Screen name="GetStarted" component={GetStarted}/>
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen name="ServicesPage" component={ServicesPage}/>
        <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfessionalList" component={ProfessionalistScreen} />
        <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfile} />
        <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
        <Stack.Screen name="BookingDetailsScreen" component={BookingDetailsScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="MessageDetailsScreen" component={MessageDetailsScreen} />
        <Stack.Screen name="ClinicListScreen" component={ClinicListScreen} />
        <Stack.Screen name="NearbyProfessionals" component={NearbyProfessionals} />
        <Stack.Screen name="NearbyClinic" component={NearbyClinic} />
        <Stack.Screen name="EmergencyScreen" component={EmergencyScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    
    );
}
export default PatientStack;
