// src/firebase/config.ts

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwh5-QEeWjPlC6Z-_5l-wEOjW2jZ_CHMg",
  authDomain: "heritagoo.firebaseapp.com",
  projectId: "heritagoo",
  storageBucket: "heritagoo.firebasestorage.app",
  messagingSenderId: "1078603779952",
  appId: "1:1078603779952:web:70c286a3383397216d89b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);