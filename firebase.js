import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4uBscwstiIhMpA5TK_16IRvbtQSRz1SA",
    authDomain: "pm-app-9efeb.firebaseapp.com",
    projectId: "pm-app-9efeb",
    storageBucket: "pm-app-9efeb.appspot.com",
    messagingSenderId: "981800176767",
    appId: "1:981800176767:web:6120b2f06c9ffe5926c34a"
  };


  // Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };