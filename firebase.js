// SDK에서 필요한 기능을 가져옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore-compat.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage-compat.js";

// Firebase 프로젝트 구성으로 설정합니다.
const firebaseConfig = {
  apiKey: "AIzaSyAacCYNcsw241GRaLn9A5jUuS0hm0qbxbs",
  authDomain: "project-52d4c.firebaseapp.com",
  projectId: "project-52d4c",
  storageBucket: "project-52d4c.appspot.com",
  messagingSenderId: "587892298418",
  appId: "1:587892298418:web:43d4e281e654f11750efab",
  measurementId: "G-ZY1J3CGR0E",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
// const app = firebase.initializeApp(firebaseConfig);
// const dbService = firebase.firestore(app);

async function addDatas(collectionName, dataObj) {
  // 문서의 ID는 자동으로 배정됩니다.
  try {
    const collect = await collectionName(db, collectionName);
    await addDoc(collect, dataObj); // 결과는 undefined입니다.
    return true;
  } catch (error) {
    return false;
  }
}

async function getDatas(collectionName){
  const collect = await collectionName(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  // getDoc(문서레퍼런스);
  // updateDoc(문서데이터, 수정할 정보객체);
  const docRef = await docId(db, collectionName, docId);
  await updateDoc(docRef, updateInfoObj);
}

async function deleteDatas(collectionName, docId){
    const docRef = await docId(db, collectionName, docId);
    await deleteDoc(docRef);
}

export { app, db, dbService, storageService, addDatas, getDatas, updateDatas, deleteDatas };
