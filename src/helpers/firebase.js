// Import the functions you need from the SDKs you needimport { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
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
import { clearUser, setUser } from "../features/AuthSlice";
import { setBlogList } from "../features/BlogSlice";

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

export const useBlogListListener = (dispatch) => {
  useEffect(() => {
    onSnapshot(contactRef, (snapshot) => {
      // setBlogList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      dispatch(
        setBlogList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
      // return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  }, []);
};
export const getDataById = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const editBlog = ({ title, picture }, favorite, id, navigate) => {
  try {
    const docRef = doc(db, "users", id);
    console.log(favorite);
    console.log("çalıştı");
    if (favorite) {
      updateDoc(docRef, {
        favorite,
      });
    } else {
      updateDoc(docRef, {
        title,
        picture,
        date: (" " + new Date()).slice(0, 25),
      });
      toastSuccessNotify("Updated Successfully!");
      navigate("/dashboard");
    }
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

export const deleteBlog = (id, navigate) => {
  try {
    deleteDoc(doc(db, "users", id));
    toastErrorNotify("Deleted Successfully");
    navigate(-1);
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

export const addBloggItem = ({ title, picture }, name, email, navigate) => {
  try {
    addDoc(contactRef, {
      title,
      picture,
      date: (" " + new Date()).slice(0, 25),
      name,
      email,
      favorite: false,
    });
    toastSuccessNotify("Added Successfully!");
    navigate("/dashboard");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

//! auth functions
export const createUserWithMail = async (
  { username, email, password },
  navigate
) => {
  await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(auth.currentUser, {
    displayName: username,
  });

  navigate("/");
};

export const LoginWithMail = ({ email, password }, navigate, dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      toastSuccessNotify("Login is succesfull...");
      // dispatch(setUser({ email }));
      navigate("/dashboard");

      dispatch(setUser({ name: userCredential.user.displayName, email }));
    })
    .catch((error) => {
      const errorMessage = error.message;
      // setErr(errorMessage.split("/")[1].split("-").join(" ").replace(").", ""));
      toastErrorNotify(
        errorMessage.split("/")[1].split("-").join(" ").replace(").", "")
      );
    });
};

export const IsLogin = (setUSerInfo) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // eslint-disable-next-line
      const uid = user.uid;
      setUSerInfo({
        name: user.displayName,
        email: user.email,
        creatTime: user.metadata.creationTime.replace("GMT", ""),
        singupTime: user.metadata.lastSignInTime.replace("GMT", ""),
      });
      console.log(user);
      // setNowUSer({ name: user.displayName, email: user.email });
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

export const singOut = (dispatch) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      dispatch(clearUser());
    })
    .catch((error) => {
      // An error happened.
    });
};
