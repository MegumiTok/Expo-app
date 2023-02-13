import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

import { getStorage } from "firebase/storage";

import { All_EVENTS, ALL_USERS, CREATORS_POSTS } from "./const";

//Environment variables in Expo-----------
import ENV from "../../env";

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

//=====================================
const firebaseConfig = {
  apiKey: ENV.API_KEY,
  authDomain: ENV.AUTH_DOMAIN,
  projectId: ENV.PROJECT_ID,
  storageBucket: ENV.STORAGE_BUCKET,
  messagingSenderId: ENV.MESSAGING_SENDER_ID,
  appId: ENV.APP_ID,
  measurementId: ENV.MEASUREMENT_ID
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

export const allUsersColRef = collection(db, ALL_USERS);
export const postsColRef = collection(db, CREATORS_POSTS);
export const allEventsColRef = collection(db, All_EVENTS);
