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

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "../index.html";
}

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", function () {});