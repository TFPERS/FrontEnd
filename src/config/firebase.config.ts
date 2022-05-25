// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAU-CeTSxBQyLfG0h22FNFWRd2nmA-p_XA",
  authDomain: "tfpers.firebaseapp.com",
  projectId: "tfpers",
  storageBucket: "tfpers.appspot.com",
  messagingSenderId: "351724766872",
  appId: "1:351724766872:web:e5c8e0f2bc6277122b32ed",
  measurementId: "G-MVBQHEF7Z1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
