// src/firebase/config.ts

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc7sLKzhOSdW_Iqs9DYVxR-ZBJ4eqz6Ek",
  authDomain: "heritago-66a32.firebaseapp.com",
  projectId: "heritago-66a32",
  storageBucket: "heritago-66a32.firebasestorage.app",
  messagingSenderId: "341319340410",
  appId: "1:341319340410:web:db6bc91982cf65920506c3",
  measurementId: "G-GTH860KKML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);