// Import the functions you need from the SDKs you needimport { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "./toastNotify";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_APP_MESSENGER,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const contactRef = collection(db, "users");

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//! database connetct functions

export const useContactListener = (setContactList) => {
  useEffect(() => {
    onSnapshot(contactRef, (snapshot) => {
      setContactList(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      //console.log(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);
};

export const editContact = ({ id, name, phone, gender }, setEdit) => {
  try {
    const docRef = doc(db, "contact", id);
    updateDoc(docRef, { name, phone, gender });
    setEdit(false);
    toastSuccessNotify("Updated Successfully!");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

export const deleteContact = (id) => {
  try {
    deleteDoc(doc(db, "contact", id));
    toastErrorNotify("Deleted Successfully");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

export const addContactItem = (addContact) => {
  try {
    addDoc(contactRef, { ...addContact });
    toastSuccessNotify("Added Successfully!");
    console.log("çalıştı");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

//! auth functions
export const createUserWithMail = ({ username, email, password }, navigate) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // eslint-disable-next-line
      const user = userCredential.user;
      navigate("/login");
    })
    .catch((error) => {
      // eslint-disable-next-line
      const errorCode = error.code;
      const errorMessage = error.message;
      // setErr(errorMessage.split("/")[1].split("-").join(" ").replace(").", ""));
    });
  updateProfile(auth.currentUser, {
    displayName: username,
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

export const LoginWithMail = ({ email, password }, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      toastSuccessNotify("Login is succesfull...");
      // dispatch(setUser({ email }));
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      // setErr(errorMessage.split("/")[1].split("-").join(" ").replace(").", ""));
      toastErrorNotify(
        errorMessage.split("/")[1].split("-").join(" ").replace(").", "")
      );
    });
};

export const IsLogin = (setUser, setRefresh) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // eslint-disable-next-line
      const uid = user.uid;
      console.log(user.email);
      setUser({ email: user.email });
      setRefresh(true);
    } else {
    }
  });
};

export const LoginWithGoogle = (navigate) => {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // eslint-disable-next-line
      const token = credential.accessToken;
      // The signed-in user info.
      // eslint-disable-next-line
      const user = result.user;
      navigate("/dashboard");
    })
    .catch((error) => {
      // Handle Errors here.
      // eslint-disable-next-line
      const errorCode = error.code;
      // eslint-disable-next-line
      const errorMessage = error.message;

      // eslint-disable-next-line
      const email = error.customData.email;
      // The AuthCredential type that was used.
      // eslint-disable-next-line
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const singOut = (dispatch, clearUser, clearFavoriteList) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(clearUser());
      dispatch(clearFavoriteList());
    })
    .catch((error) => {
      // An error happened.
    });
};
