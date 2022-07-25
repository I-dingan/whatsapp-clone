import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCm0mZvWLb_8P9ZTNg76K6v-V_vCIK7k64",
  authDomain: "whatsapp-2-1aeee.firebaseapp.com",
  projectId: "whatsapp-2-1aeee",
  storageBucket: "whatsapp-2-1aeee.appspot.com",
  messagingSenderId: "125862709093",
  appId: "1:125862709093:web:4efdad34f18dd91f50838c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider}
