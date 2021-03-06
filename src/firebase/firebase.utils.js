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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // generate new doc with random key
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// firestore.collection('users').doc('Fn4F3skC4LKHfNS7iqON').collection('cartItems').doc('BGV0Zn4CG0FmiOKaFptN');
// firestore.doc('/users/Fn4F3skC4LKHfNS7iqON/cartItems/BGV0Zn4CG0FmiOKaFptN');
// firestore.collection('/users/Fn4F3skC4LKHfNS7iqON/cartItems');

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
