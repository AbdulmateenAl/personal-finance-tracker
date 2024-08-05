// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0G4KAf7QJCYUKNOKRclZecXukasVatAc",
  authDomain: "personal-finance-tracker-49526.firebaseapp.com",
  projectId: "personal-finance-tracker-49526",
  storageBucket: "personal-finance-tracker-49526.appspot.com",
  messagingSenderId: "122607605578",
  appId: "1:122607605578:web:26956a05ed724dd6f593b3",
  measurementId: "G-JMBH5RY5H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db};