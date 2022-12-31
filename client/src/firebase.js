// reference: https://blog.logrocket.com/user-authentication-firebase-react-apps/
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi9KWjc3WjffDqHOtbQtfm_ieS_OSu2RQ",
  authDomain: "mvp-jobtrackr.firebaseapp.com",
  projectId: "mvp-jobtrackr",
  storageBucket: "mvp-jobtrackr.appspot.com",
  messagingSenderId: "402101967739",
  appId: "1:402101967739:web:c1c9791f481fcfa7ae7bde",
  measurementId: "G-0DR1XXP8T2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// user authentication using google account
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const { user } = res;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error("Err log in with google account", err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("Err logging in using email and password!", err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: username,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error("Err registering with emails and password!", err);
    alert(err.message);
  }
};

// log out
const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
