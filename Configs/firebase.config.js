import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTxAsuw9Thixsvf2ahNRGH_0oQP1c_Glo",
  authDomain: "e-learning-422403.firebaseapp.com",
  projectId: "e-learning-422403",
  storageBucket: "e-learning-422403.appspot.com",
  messagingSenderId: "209482923100",
  appId: "1:209482923100:web:b1a061de40acb43cc43a99"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export {app, firebaseAuth, firestoreDB};