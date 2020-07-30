import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCZ59SEdKKN4ibsXhbvMwJQuyRZDOc1uns",
  authDomain: "the-retail-giant-db.firebaseapp.com",
  databaseURL: "https://the-retail-giant-db.firebaseio.com",
  projectId: "the-retail-giant-db",
  storageBucket: "the-retail-giant-db.appspot.com",
  messagingSenderId: "288628043030",
  appId: "1:288628043030:web:99b872b8010e772ba63437",
  measurementId: "G-2QWW7CEVWG"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
