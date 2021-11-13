import firebase from "firebase/compat/app";
import "firebase/compat"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCGg6ahEOhPqgEcQ-aO2yV9U9OsjoJRyww",
    authDomain: "ventify-582e8.firebaseapp.com",
    projectId: "ventify-582e8",
    storageBucket: "ventify-582e8.appspot.com",
    messagingSenderId: "748372598989",
    appId: "1:748372598989:web:6b47dc6fab08123b3f0984",
    measurementId: "G-PSLYKPNEVW"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };