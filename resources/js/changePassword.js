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
  doc,
  updateDoc,
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

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "../index.html";
}

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async function () {
  const form = document.forms["changePassword"];
  const newPassword = form["newPassword"].value;
  const newPasswordConfirm = form["newPasswordConfirm"].value;

  if (newPassword !== newPasswordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  const userId = "input[name='newPassword']";

  try {
    const userDocRef = doc(dbService, "userInfo", userId);
    await updateDoc(userDocRef, {
      password: newPassword,
    });
    alert("비밀번호가 성공적으로 변경되었습니다!");
  } catch (error) {
    console.error("Error updating document: ", error);
    alert("비밀번호 변경 중 오류가 발생했습니다.");
  }
});
