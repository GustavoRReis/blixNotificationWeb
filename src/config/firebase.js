import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBCWD-5yXlUlhqPMMui9RCpwsmfdnGICNs',
  authDomain: 'blixnews.firebaseapp.com',
  projectId: 'blixnews',
  storageBucket: 'blixnews.appspot.com',
  messagingSenderId: '120962731573',
  appId: '1:120962731573:web:a8e1f310eb3dc38719ab7c',
  measurementId: 'G-H9H11MF59T',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
