import * as firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCcy2-7YattiV1P7K1JQQLT0nFzsDhELfM",
  authDomain: "robhern-firegram.firebaseapp.com",
  databaseURL: "https://robhern-firegram.firebaseio.com",
  projectId: "robhern-firegram",
  storageBucket: "robhern-firegram.appspot.com",
  messagingSenderId: "195492631132",
  appId: "1:195492631132:web:7abf66cb0aa4d88e2f8c99",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage(),
  projectFirestore = firebase.firestore();

//create firebase timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
