// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKY0sISTfPSA2vu-f8L5d_KhfPzVeTzB8",
  authDomain: "food-app-5c4d0.firebaseapp.com",
  projectId: "food-app-5c4d0",
  storageBucket: "food-app-5c4d0.firebasestorage.app",
  messagingSenderId: "455201537303",
  appId: "1:455201537303:web:2948d570fcbab9a827cb52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc };