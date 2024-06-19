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

async function getDatas(collectionName){
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

// 게시글을 등록할 수 있는 함수입니다. (단, 문서 ID는 수동으로 할당 됨)
async function addDatas(collectionName, dataObj) {
  try {
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);
    return true;
  } catch (error) {
    return false;
  }
}

// 게시글을 수정할 수 있는 함수입니다.
async function updateDatas(collectionName, docId, updateInfoObj){
  const docRef = await docId(db, collectionName, docId);
  await updateDoc(docRef, updateInfoObj);
}

// 게시글을 삭제할 수 있는 함수입니다.
async function deleteDatas(collectionName, docId){
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

export { db, getDatas, addDatas, updateDatas, deleteDatas }
