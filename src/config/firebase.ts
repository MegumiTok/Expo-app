import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import Constants from "expo-constants";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
  initializeAuth
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

import { getStorage } from "firebase/storage";

// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID
// } from "@env";

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   measurementId: MEASUREMENT_ID
// };

// const firebaseConfig = {
//   apiKey: Constants.manifest?.extra?.apiKey,
//   authDomain: Constants.manifest?.extra?.authDomain,
//   projectId: Constants.manifest?.extra?.projectId,
//   storageBucket: Constants.manifest?.extra?.storageBucket,
//   messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
//   appId: Constants.manifest?.extra?.appId,
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   measurementId: Constants.manifest?.extra?.measurementId
// };

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBbxgT0JPTuFcsJ5j0Ei9zi_RuNbVPftkw",
  authDomain: "expo-app-v1.firebaseapp.com",
  projectId: "expo-app-v1",
  storageBucket: "expo-app-v1.appspot.com",
  messagingSenderId: "101103478402",
  appId: "1:101103478402:web:af6a87e4405b54cf5fb69b",
  measurementId: "G-P92J2XYT5E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
