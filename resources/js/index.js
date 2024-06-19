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
    loginButton.classList.add("disabled");
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
updateButtonState();
