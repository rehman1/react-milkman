// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2_aK-iXo59Z8sUUf9MdvviTs4OLpeJ2Y",
  authDomain: "milkman-d1f88.firebaseapp.com",
  projectId: "milkman-d1f88",
  storageBucket: "milkman-d1f88.appspot.com",
  messagingSenderId: "195354807661",
  appId: "1:195354807661:web:6ee0fa1a12b043da461e64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}