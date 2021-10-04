import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBS2Nx-OKStzwqpZ3Rq3VDDCfy34fqiFhQ",
  authDomain: "rn-uber-clone-380ae.firebaseapp.com",
  projectId: "rn-uber-clone-380ae",
  storageBucket: "rn-uber-clone-380ae.appspot.com",
  messagingSenderId: "438562754552",
  appId: "1:438562754552:web:b0c2b205fa1ec555dd500d",
  measurementId: "G-6MXERQ6SNJ",
};

// Checking if it is already initialized
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
