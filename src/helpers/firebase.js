// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_APP_MESSENGER,
  databaseURL: process.env.REACT_APP_DB_URL,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const createPost = (name, email, imageUrl) => {
  set(ref(db, "users/"), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
  //! tarih okuma
  set(ref(db, "users/"), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  })
    .then(() => {
      // Data saved successfully!
    })
    .catch((error) => {
      // The write failed...
    });
};
export const readItem = (postId) => {
  const starCountRef = ref(db, "posts/" + postId + "/starCount");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
  });
};

export const updateData = (uid, username, picture, title, body) => {
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture,
  };
  const newPostKey = push(child(ref(db), "posts")).key;
  const updates = {};
  updates["/posts/" + newPostKey] = postData;
  //   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  set(ref(db, "users/" + userId), {
    username: username,
    profile_picture: picture,
  })
    .then(() => {
      // Data saved successfully!
    })
    .catch((error) => {
      // The write failed...
    });
  return update(ref(db), updates);
};
export const deleteItem = (id) => {
  remove(ref(db, "user/" + id));
  Toastify("Sİlme işlemi başarılı");
};
