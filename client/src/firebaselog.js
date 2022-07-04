import firebase from  'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyASDXUgGaTpW6uFMo-JNB_FSNOvML0s8Jw",
  authDomain: "user-206ca.firebaseapp.com",
  projectId: "user-206ca",
  storageBucket: "user-206ca.appspot.com",
  messagingSenderId: "646520644257",
  appId: "1:646520644257:web:7604c13c57729669b006e0",
  measurementId: "G-WNWC997Q08"
});

export const auth = app.auth()
export default app

