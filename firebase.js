import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS2Nx-OKStzwqpZ3Rq3VDDCfy34fqiFhQ",
  authDomain: "rn-uber-clone-380ae.firebaseapp.com",
  projectId: "rn-uber-clone-380ae",
  storageBucket: "rn-uber-clone-380ae.appspot.com",
  messagingSenderId: "438562754552",
  appId: "1:438562754552:web:b0c2b205fa1ec555dd500d",
  measurementId: "G-6MXERQ6SNJ",
};

// Initialize Firebase
// verify that firebase is instantiated only once in the app
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize cloud firestore and get a reference to the service
const db = getFirestore(app);

export default db;
