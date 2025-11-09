
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrulFdaXMGyKS2LB9Wj9ZWiMox_lF1568",
  authDomain: "car-project-72ad7.firebaseapp.com",
  projectId: "car-project-72ad7",
  storageBucket: "car-project-72ad7.firebasestorage.app",
  messagingSenderId: "979019130357",
  appId: "1:979019130357:web:b87f060ed06d11dc8eecbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);