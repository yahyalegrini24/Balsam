import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_YuhhHD9GzDMk5yoZvO633DkF6ZEIQ3k",
  authDomain: "balsam-533ad.firebaseapp.com",
  projectId: "balsam-533ad",
  storageBucket: "balsam-533ad.firebasestorage.app",
  messagingSenderId: "20060257612",
  appId: "1:20060257612:android:73f1cd1ac9d96edceb63e9",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { firebaseApp, firebaseAuth };
