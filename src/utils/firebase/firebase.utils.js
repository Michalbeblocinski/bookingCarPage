import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdND55Ola9D7c2lRFadsM6LRPGBX3KQ4E",
  authDomain: "car-rental-c455f.firebaseapp.com",
  projectId: "car-rental-c455f",
  storageBucket: "car-rental-c455f.appspot.com",
  messagingSenderId: "1080560071949",
  appId: "1:1080560071949:web:d8faa65825600ae3b26c44",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

//Login + auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//db


// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = collection(db, collectionKey)
//   const batch = writeBatch(db)
// }

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};



export const signOutUser = async () => {
  await signOut(auth)
  window.location.replace('/car-rental-froncik')
};

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback)
 

//Storage