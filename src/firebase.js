import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhzfTw8vp2MzDOyGIUtqL4a8hytzJ-B44",
  authDomain: "note-app-796d2.firebaseapp.com",
  projectId: "note-app-796d2",
  storageBucket: "note-app-796d2.appspot.com",
  messagingSenderId: "642924004390",
  appId: "1:642924004390:web:7cb6f95f492c72bb2fd2e7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const noteCollection = collection(db, "notes");
