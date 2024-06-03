import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-f7d90.firebaseapp.com",
  projectId: "chat-f7d90",
  storageBucket: "chat-f7d90.appspot.com",
  messagingSenderId: "510784031343",
  appId: "1:510784031343:web:0e26eec146f549f54e1b9a",
};

// Initialize Firebase, databse and storage
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
