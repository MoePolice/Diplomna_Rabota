// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import { firestore } from "./firebase";
import "firebase/auth";
import "firebase/firestore";

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
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

// Set up the function to retrieve ID tokens from authenticated users
const getIdToken = async () => {
  const user = auth.currentUser;
  if (user) {
    console.log("User is authenticated");
    const idTokenResult = await user.getIdTokenResult();
    console.log("idTokenResult", idTokenResult);
    return idTokenResult.token;
  } else {
    throw new Error("User not authenticated.");
  }
};

// Export the functions that need to use ID tokens
export const createUserProfile = async (email, name, userType) => {
  const token = await getIdToken();
  const userRef = firestore.collection("users").doc(auth.currentUser.uid);
  await userRef.set(
    {
      email: email,
      name: name,
      userType: userType,
    },
    { merge: true, headers: { Authorization: `Bearer ${token}` } }
  );
};

export const db = firebase.firestore();

export const createGig = async (name, price, deadline) => {
  try {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    const gigRef = await db
      .collection("freelancers")
      .doc(currentUser.uid)
      .collection("gigs")
      .add({
        name,
        price,
        deadline,
        freelancerId: currentUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error("Error creating gig: ", error);
    throw error;
  }
};

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export { firebase, firestore, auth };
