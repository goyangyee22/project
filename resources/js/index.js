import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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

// Firebase를 초기화합니다.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 로그인 여부를 확인합니다.
function isLoggedIn() {
  return sessionStorage.getItem("userInfo") === true;
}

// 각각의 버튼에 로그인 혹은 로그아웃이 되어있을 경우 버튼 활성화를 설정합니다.
// 로그인이 되어있는 경우 회원가입, 로그인 버튼을 비활성화하고 마이페이지 버튼을 활성화합니다.
// 로그인이 되어있지 않은 경우 마이페이지 버튼을 비활성화하고 회원가입, 로그인 버튼을 활성화합니다.
