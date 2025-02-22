import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB50KksSxXo8MXBVwx-hP_pyxQVTS-gJZc",
    authDomain: "take-notes-977f9.firebaseapp.com",
    projectId: "take-notes-977f9",
    storageBucket: "take-notes-977f9.firebasestorage.app",
    messagingSenderId: "926731269459",
    appId: "1:926731269459:web:76764c581a3e5719ae5da6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };