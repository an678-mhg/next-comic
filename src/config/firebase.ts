import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCYuq5QCkLjTXbYKFlKXnoYdNdMZ7UHXoc",
  authDomain: "next-comics.firebaseapp.com",
  projectId: "next-comics",
  storageBucket: "next-comics.appspot.com",
  messagingSenderId: "337682062073",
  appId: "1:337682062073:web:ba524fd545e08e37ca6028",
  measurementId: "G-X4F5HKYCDX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
