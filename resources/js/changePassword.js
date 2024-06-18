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
// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 비밀번호 형식입니다.
let pwEx = /^[0-9A-Za-z\d$@$!%*?&]{4,16}/g;

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "../index.html";
}

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async function () {
  const newPassword = document.querySelector("input[name='newPassword']").value;
  const newPasswordConfirm = document.querySelector(
    "input[name='newPasswordConfirm']"
  ).value;

  // 비밀번호 형식이 지켜지지 않을 경우 비밀번호를 변경할 수 없습니다.
  if (!pwEx.test(newPassword)) {
    alert(
      "비밀번호 형식이 올바르지 않습니다. 4자-16자 사이의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
    );
    return false;
  }

  // 새로운 비밀번호와 새로운 비밀번호 확인의 입력값이 일치하지 않으면 비밀번호를 변경할 수 없습니다.
  if (newPassword !== newPasswordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  // 새로운 비밀번호와 새로운 비밀번호 확인의 입력값이 일치하면 비밀번호가 변경 됩니다.
  const userpw = document.querySelector("input[name='newPassword']").value;

  const userDocRef = doc(db, "userInfo", userpw);
  try {
    await updateDoc(userDocRef, {
      pw: newPassword,
    });
    alert("비밀번호가 성공적으로 변경되었습니다!");

    // 세션 스토리지에 변경된 비밀번호를 업데이트 합니다.
    sessionStorage.setItem("pw", userpw);
  } catch (error) {
    console.error("Error updating document: ", error);
    alert("비밀번호 변경 중 오류가 발생했습니다.");
  }
});

// 세션 스토리지에서 사용자 정보(pw) 업데이트
// pw의 값이 변경되면 Firestore database에서 pw의 값 변경
