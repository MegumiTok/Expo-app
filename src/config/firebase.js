// Import the functions you need from the SDKs you need
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
  signInWithCredential
} from "firebase/auth";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId
};

// const firebaseConfig = {
//   apiKey: Constants.expoConfig.extra.apiKey,
//   authDomain: Constants.expoConfig.extra.authDomain,
//   projectId: Constants.expoConfig.extra.projectId,
//   storageBucket: Constants.expoConfig.extra.storageBucket,
//   messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
//   appId: Constants.expoConfig.extra.appId,
//   measurementId: Constants.expoConfig.extra.measurementId
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
