import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth();
const db = getFirestore(app);
// Initialize Firestore and get a reference to the service
export {db,auth}