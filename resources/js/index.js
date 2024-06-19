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
  return sessionStorage.getItem("userInfo") === "true";
}

function updateButtonState() {
  const loginButton = document.querySelector(".spot-login a");
  const joinButton = document.querySelector(".spot-join a");
  const pageButton = document.querySelector(".spot-page a");

  if (isLoggedIn(true)) {
    loginButton.style.pointerEvents = "none";
    loginButton.style.opacity = "0.5";
    joinButton.style.pointerEvents = "none";
    joinButton.style.opacity = "0.5";
    pageButton.style.pointerEvents = "auto";
    pageButton.style.opacity = "1";
  } else {
    loginButton.style.pointerEvents = "auto";
    loginButton.style.opacity = "1";
    joinButton.style.pointerEvents = "auto";
    joinButton.style.opacity = "1";
    pageButton.style.pointerEvents = "none";
    pageButton.style.opacity = "0.5";
  }
}
// 페이지를 로드하면 버튼 상태를 업데이트합니다.
document.addEventListener("DOMContentLoaded", updateButtonState);

// 각각의 버튼에 로그인 혹은 로그아웃이 되어있을 경우 버튼 활성화를 설정합니다.
// 로그인이 되어있는 경우 회원가입, 로그인 버튼을 비활성화하고 마이페이지 버튼을 활성화합니다.
// 로그인이 되어있지 않은 경우 마이페이지 버튼을 비활성화하고 회원가입, 로그인 버튼을 활성화합니다.
