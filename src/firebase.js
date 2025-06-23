// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdIa5IgZybR87AXdBb-CCLdjNCwOyeWrk",
  authDomain: "react-d9eb8.firebaseapp.com",
  projectId: "react-d9eb8",
  storageBucket: "react-d9eb8.firebasestorage.app",
  messagingSenderId: "148256747418",
  appId: "1:148256747418:web:3e347012d4b4c923a29423",
  measurementId: "G-8QBKL070LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 
export const db = getFirestore(app); 