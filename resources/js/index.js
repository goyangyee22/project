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

// 페이지가 로드되면 코드가 실행됩니다.

// 로그인이 되었는지 확인합니다.
// sessionStorage에 로그인 정보가 있는지 확인합니다.

// 버튼 상태를 업데이트 합니다.

// 로그인 되어 있는 경우 버튼 비활성화
//   loginButton.style.pointerEvents = "none"; // 클릭 이벤트 비활성화
//   loginButton.style.opacity = "0.5"; // 투명도 조절 등으로 비활성화 스타일 적용

//   joinButton.style.pointerEvents = "none"; // 클릭 이벤트 비활성화
//   joinButton.style.opacity = "0.5"; // 투명도 조절 등으로 비활성화 스타일 적용

// 로그인 되어 있지 않은 경우 버튼 활성화
//   loginButton.style.pointerEvents = "auto"; // 클릭 이벤트 활성화
//   loginButton.style.opacity = "1"; // 투명도 원래대로

//   joinButton.style.pointerEvents = "auto"; // 클릭 이벤트 활성화
//   joinButton.style.opacity = "1"; // 투명도 원래대로

// 페이지 로드 시 버튼 상태 업데이트
