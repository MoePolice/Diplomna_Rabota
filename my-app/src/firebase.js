// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVGS-PWX4U1tU8Q1Z_yoJFxtyogP8nl5I",
  databaseURL: "https://auth-development-62ddd-default-rtdb.firebaseio.com",
  authDomain: "auth-development-62ddd.firebaseapp.com",
  projectId: "auth-development-62ddd",
  storageBucket: "auth-development-62ddd.appspot.com",
  messagingSenderId: "601274182747",
  appId: "1:601274182747:web:093a18c4211ffdc8d8a37e",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };
