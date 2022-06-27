import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-mG880nSkckjIdjsD9asQt0AJNBUCRts",
  authDomain: "spanish-recipes-3795c.firebaseapp.com",
  projectId: "spanish-recipes-3795c",
  storageBucket: "spanish-recipes-3795c.appspot.com",
  messagingSenderId: "1062089744632",
  appId: "1:1062089744632:web:29da46c5bbd34448085b0d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore()

export { db }