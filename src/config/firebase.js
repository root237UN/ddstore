// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0TgfHuNJ8jeTUV9xZo0aDwcqx5pd-v1s",
  authDomain: "ddstore-66315.firebaseapp.com",
  projectId: "ddstore-66315",
  storageBucket: "ddstore-66315.appspot.com",
  messagingSenderId: "139626965719",
  appId: "1:139626965719:web:ed06405363277a3dd2de92",
  measurementId: "G-VPBTJ2XVP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);