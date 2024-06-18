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

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      alert("로그인을 해주세요.");
      window.location.href = "../index.html";
    }

// 게시글을 올릴 때 userInfo의 이름, 제목, 내용이 드러나게 게시글을 올립니다.

// Firestore에서 "userInfo" 컬렉션에서 입력한 이름이 있는지 조회합니다.
const usersRef = collection(dbService, "userInfo");
const q = query(usersRef, where("name", "==", name));
const querySnapshot = await getDocs(q);
console.log(querySnapshot);

// updateBtn을 클릭하면 처리하는 함수를 생성합니다.
async function handleSignUp(){
    // 폼에서 사용자가 입력한 값들을 가져옵니다.
const getName = await getDatas("userInfo");
  const title = document.forms["updateForm"]["title"].value;
  const content = document.forms["updateForm"]["content"].value;
 
//   if(){}

//   try{}
//   catch(error){}
  };


// 회원 목록 조회 함수

// 제목 및 내용을 작성하고 누르는 버튼입니다.
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", function () {
  // 게시글에 대한 정보 객체를 생성합니다.
  const boardUpdate = {
    name: document.querySelector("name").value,
    title: document.querySelector("input[name='title']").value,
    content: document.querySelector("input[name='content']").value,
  };

  // 파이어베이스에 작성한 게시글의 데이터를 저장합니다.
  const result = await addDatas("board", boardUpdate);

  // 저장 결과에 따라 페이지가 리로딩(성공)되거나, "게시글 업로드에 실패 하였습니다." 라는 alert창(실패)이 나타납니다.
  result ? handleSignUp() : alert("게시글 업로드에 실패 하였습니다.");
});
