import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

export const config = {
  apiKey: "AIzaSyCKHnk_AIoXYU7BcUa63LhQQWa6-Ma3ujQ",
  authDomain: "school-calendar-staging.firebaseapp.com",
  databaseURL: "https://school-calendar-staging.firebaseio.com",
  projectId: "school-calendar-staging",
  storageBucket: "school-calendar-staging.appspot.com",
  messagingSenderId: "482714059970",
  appId: "1:482714059970:web:b34c56dcb33f214576675b",
  measurementId: "G-2NCWESMGBP"
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const app = firebase.initializeApp(config);
export const db = firebase.firestore();
export const functions = firebase.functions();
export default firebase;
