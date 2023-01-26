import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAVGS-PWX4U1tU8Q1Z_yoJFxtyogP8nl5I",
//   authDomain: "auth-development-62ddd.firebaseapp.com",
// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: "auth-development-62ddd",
//   storageBucket: "auth-development-62ddd.appspot.com",
//   messagingSenderId: "601274182747",
//   appId: "1:601274182747:web:093a18c4211ffdc8d8a37e"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
