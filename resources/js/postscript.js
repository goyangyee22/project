import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  // app,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "./signIn.html";
}

// 게시글을 작성하는 함수입니다.
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const boardInfo = {
    name: userInfo.name,
    date: Date(),
    title: document.querySelector("input[name='title']").value,
    content: document.querySelector("input[name='content']").value,
  };

  const userInfo = sessionStorage.getItem("userInfo");
  const usersRef = collection(dbService, "userInfo");
  const q = query(usersRef, where("name", "==", JSON.parse(userInfo).name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const { name } = doc.data();
    console.log(`${name}님의 이름으로 후기를 남깁니다.`);
  });

  // Firebase에 게시글에 대한 정보를 저장합니다.
  const result = await addDatas("board", boardInfo);
  // 파이어베이스에 데이터를 저장
  // 작성 결과가 성공 ==> 페이지 리로딩
  // 결과가 실패 ==> "작성을 실패했습니다."
});

// 게시글을 수정하는 함수입니다. (한 번에 한 개의 게시글씩 수정 가능)

// 게시글을 삭제하는 함수입니다. (한 번에 여러 개의 게시글 삭제 가능)
