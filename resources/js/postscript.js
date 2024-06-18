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

// 게시글을 올릴 때 userInfo의 이름, 제목, 내용이 드러나게 게시글을 올립니다.

// Firestore에서 "board" 컬렉션에서 입력한 이름이 있는지 조회합니다.
const usersRef = collection(dbService, "board");
const q = query(usersRef, where("name", "==", name));
const querySnapshot = await getDocs(q);
console.log(querySnapshot);

// updateBtn을 클리하면 처리하는 함수를 생성합니다.
async function handleSignUp() {
  // 폼에서 사용자가 입력한 값들을 가져옵니다.
  // name은 userInfo에서 가져옵니다.
  const userInfo = { name, id, pw };
  const userName = await getDatas(userInfo.name);
  const name = userName.value;
  const title = document.forms["updateForm"]["title"].value;
  const content = document.forms["updateForm"]["content"].value;

// 제목과 내용이 빈 칸인 채로 게시글을 작성할 수 없게 합니다.
  if (!title || !content) {
    alert("제목과 내용은 빈 칸으로 작성하실 수 없습니다.");
    return false;
  }

  // 유효한 게시글인 경우 Firestore에 데이터를 저장합니다.
  // 데이터를 저장하는 위치는 Firebase의 "board" 컬렉션입니다.
  try{
    console.log(name, title, content);
    const board = { name, title, content };
    const boardInfo = await addDatas("board", board);
    console.log(board, boardInfo);
    alert("게시글이 작성 되었습니다.");
  }
}
