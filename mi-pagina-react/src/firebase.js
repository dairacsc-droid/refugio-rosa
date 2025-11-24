import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrSZH09khxy-WyFJ5pq7yfWLIHxAHapSo",
  authDomain: "mi-app-13f42.firebaseapp.com",
  projectId: "mi-app-13f42",
  storageBucket: "mi-app-13f42.firebasestorage.app",
  messagingSenderId: "131598500855",
  appId: "1:131598500855:web:63d3cd269eafbe778d24f2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
