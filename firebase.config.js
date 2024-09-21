// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey:  process.env.FIREBASE_API_KEY,//"AIzaSyB7uwBn6NNsZlW0SsuOXsduuWb0doVH1gE",
  authDomain: "entheogen-a76f2.firebaseapp.com",
  databaseURL: "https://entheogen-a76f2.firebaseio.com",
  projectId: "entheogen-a76f2",
  storageBucket: "entheogen-a76f2.appspot.com",
  messagingSenderId: "356566894136",
  appId: "1:356566894136:web:7883d85313c1a75efb88cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();