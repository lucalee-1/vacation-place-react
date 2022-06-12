// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "vacation-place-react.firebaseapp.com",
  projectId: "vacation-place-react",
  storageBucket: "vacation-place-react.appspot.com",
  messagingSenderId: "118651553256",
  appId: "1:118651553256:web:e0ff7dfa145a6e32d3505d",
  measurementId: "G-029JJ6Q6KG"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()