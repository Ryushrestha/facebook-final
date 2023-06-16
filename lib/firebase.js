import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2HnLhvfsz7FCxEqANTYGy5dSy3wvKT98",
  authDomain: "social-media-stha.firebaseapp.com",
  projectId: "social-media-stha",
  storageBucket: "social-media-stha.appspot.com",
  messagingSenderId: "777132038893",
  appId: "1:777132038893:web:f546d9279135b208760ae4"
};


 const app = !getApps().length ? initializeApp(firebaseConfig) :getApp()
 const db = getFirestore();
 const auth = getAuth();
 const storage = getStorage();

 export {app,db,auth,storage}


