// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWbTsQ6nz7_V-1j9jzCtJ3by7PRHDW6nI",
  authDomain: "my-assignment-7b4ce.firebaseapp.com",
  projectId: "my-assignment-7b4ce",
  storageBucket: "my-assignment-7b4ce.appspot.com",
  messagingSenderId: "987006547048",
  appId: "1:987006547048:web:742a7a911e76db4d6a37dd",
  measurementId: "G-QV2N34C6PW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);

export {db,storage,app};