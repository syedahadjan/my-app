import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJe-Aiq2yKr82vl5MckfkkVU5ZWpPOolg",
  authDomain: "jansmart-27ee0.firebaseapp.com",
  projectId: "jansmart-27ee0",
  storageBucket: "jansmart-27ee0.appspot.com",
  messagingSenderId: "63014718930",
  appId: "1:63014718930:web:55aa7c26f677eac48f8c0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



export default app;
