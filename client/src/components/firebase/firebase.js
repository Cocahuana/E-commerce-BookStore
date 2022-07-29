// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkVeIT8CTo1n3NfzKx7DYqPa0ENycIYV0",
  authDomain: "books-a1089.firebaseapp.com",
  projectId: "books-a1089",
  storageBucket: "books-a1089.appspot.com",
  messagingSenderId: "379476061644",
  appId: "1:379476061644:web:b5872c8ed4c805b2cb4169",
  measurementId: "G-WZ0T5KJM2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);