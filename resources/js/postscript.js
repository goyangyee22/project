import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  app,
  // db,
  dbService,
  storageService,
  addDatas,
  getDatas,
  updateDatas,
  deleteDatas,
} from "../../firebase.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// Firebase를 구성하는 정보
const firebaseConfig = {
  apiKey: "AIzaSyAacCYNcsw241GRaLn9A5jUuS0hm0qbxbs",
  authDomain: "project-52d4c.firebaseapp.com",
  projectId: "project-52d4c",
  storageBucket: "project-52d4c.appspot.com",
  messagingSenderId: "587892298418",
  appId: "1:587892298418:web:43d4e281e654f11750efab",
  measurementId: "G-ZY1J3CGR0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

