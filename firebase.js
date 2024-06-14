// SDK에서 필요한 기능을 가져옵니다.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  getDocFromCache,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

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

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase SDK로부터 Firestore 및 Storage 서비스 가져오기
const dbService = getFirestore(app);
const storageService = getStorage(app);

// export const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// const dbService = firebase.firestore(app);

// users 컬렉션에 대한 참조 작성
const usersRef = collection(dbService, "userInfo");

// 컬렉션에 대한 쿼리를 만듭니다.
const q = query(usersRef, where("id", "==", true));

async function addDatas(collectionName, dataObj) {
  // 문서 ID가 자동으로 할당됩니다.
  try {
    const collect = collection(dbService, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function getDatas(collectionName) {
  const collect = collection(dbService, collectionName);
  const snapshot = await getDocs(collect);
  return snapshot;
}

async function updateDatas(collectionName, docId, updateObj) {
  const docRef = await doc(dbService, collectionName, docId);
  await updateDoc(docRef, updateObj);
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(dbService, collectionName, docId);
  try {
    await deleteDoc(docRef);
    sss;
    return true;
  } catch (error) {
    return false;
  }
}

export {
  app,
  // db,
  dbService,
  storageService,
  addDatas,
  getDatas,
  updateDatas,
  deleteDatas,
};
