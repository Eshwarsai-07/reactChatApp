
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-07.firebaseapp.com",
  projectId: "reactchat-07",
  storageBucket: "reactchat-07.firebasestorage.app",
  messagingSenderId: "970285654241",
  appId: "1:970285654241:web:aafc6e753aff34c1cd97a0"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()