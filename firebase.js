// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore';
import {getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkelFEUuX401rf6wqWlDoNyGa8s1_hARs",
  authDomain: "fitnessproject-786d2.firebaseapp.com",
  projectId: "fitnessproject-786d2",
  storageBucket: "fitnessproject-786d2.appspot.com",
  messagingSenderId: "872081006185",
  appId: "1:872081006185:web:b06219c1cf45d35b550cf8",
  measurementId: "G-BS5FV5VDGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export {auth, firestore};