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
  const loginButton = document.querySelector(".spot-login");
  const joinButton = document.querySelector(".spot-join");
  const pageButton = document.querySelector(".spot-page");

  if (isLoggedIn(true)) {
    loginButton.classList.add("disabled");
    loginButton.classList.remove("abled");
    joinButton.classList.add("disabled");
    joinButton.classList.remove("abled");
    pageButton.classList.remove("disabled");
    pageButton.classList.add("abled");
  } else {
    loginButton.classList.add("abled");
    loginButton.classList.remove("disabled");
    joinButton.classList.add("abled");
    joinButton.classList.remove("disabled");
    pageButton.classList.remove("abled");
    pageButton.classList.add("disabled");
  }
}
updateButtonState();
