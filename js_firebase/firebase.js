import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUzbsN2eLvXftX6v_BjDCltbtjERM8Y_Y",
  authDomain: "balatro-wiki.firebaseapp.com",
  projectId: "balatro-wiki",
  storageBucket: "balatro-wiki.firebasestorage.app",
  messagingSenderId: "433807196945",
  appId: "1:433807196945:web:866d96edf0dc7ebbb142b0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);