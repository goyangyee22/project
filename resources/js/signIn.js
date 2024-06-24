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

// 로그인이 되어있는 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (userInfo) {
  alert(
    "이미 로그인이 되어있습니다, 다른 계정으로 로그인을 원하시는 경우 현재 계정을 로그아웃 하시고 다른 계정으로 로그인 하시기 바랍니다."
  );
  window.location.href = "../index.html";
}

// 회원가입 버튼을 누르면 회원가입 페이지로 이동합니다.
const signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", async (event) => {
  event.preventDefault();
  window.location.href = "./signUp.html";
});

// 로그인 버튼을 누르면 로그인이 되는 함수입니다.
const signInButton = document.getElementById("signInButton");
signInButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // 입력 한 아이디와 비밀번호의 값을 받아 옵니다.
  const id = document.getElementById("id").value;
  const pw = document.getElementById("pw").value;

  // Firestore에서 사용자의 정보를 검색합니다.
  const usersRef = collection(db, "userInfo");
  const q = query(usersRef, where("id", "==", id));

  try {
    const querySnapshot = await getDocs(q);

    // id가 있을 경우 실행되는 함수입니다.
    if (!querySnapshot.empty) {
      // Firestore에서 찾은 사용자 정보
      const userDoc = querySnapshot.docs[0];
      const userInfo = { ...userDoc.data(), docId: userDoc.id };
      console.log(userInfo);
      // 비밀번호를 비교합니다.
      if (userInfo.pw === pw) {
        // 세션 스토리지에 입력한 회원 정보가 저장 됩니다.
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

        // 메인 홈페이지로 이동합니다.
        window.location.href = "../index.html";
      } else {
        alert("아이디 또는 비밀번호가 잘못되었거나 공백입니다.");
      }
    } else {
      alert("아이디 또는 비밀번호가 잘못되었거나 공백입니다.");
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});
