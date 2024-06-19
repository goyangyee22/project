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

function updateButtonState() {
  const loginButton = document.querySelector(".spot-login a");
  const joinButton = document.querySelector(".spot-join a");
  const pageButton = document.querySelector(".spot-page a");

  if (isLoggedIn()) {
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
// DOMContentLoaded 이벤트가 발생할 때까지 기다립니다.
document.addEventListener("DOMContentLoaded", function () {
  updateButtonState();
});
