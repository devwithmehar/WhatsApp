import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCbbrmoeBU_mZmdqxMoM8lNShTaSGbkaBM",
    authDomain: "whatsapp-mern-e5480.firebaseapp.com",
    projectId: "whatsapp-mern-e5480",
    storageBucket: "whatsapp-mern-e5480.appspot.com",
    messagingSenderId: "73129035282",
    appId: "1:73129035282:web:1f2f3f08b732da7e7b3acb"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth , provider };
  export default db;