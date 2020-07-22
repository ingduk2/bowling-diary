import * as firebase from 'firebase';
import 'firebase/storage';
import {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_DATABASEURL,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID,
} from '../key/ApiKey';
// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  databaseURL: FIREBASE_DATABASEURL,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  //   appId: 'app-id',
  //   measurementId: 'G-measurement-id',
};
// 이렇게 하면 init 이 되나본데 신기하네 ㅡㅡ
console.log('fireBase Init!!!!!!!!!!!!!!!!!!!!!!!!!!');
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
