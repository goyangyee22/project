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
  addDoc,
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
updateBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  // Firebase에 게시글의 정보를 추가합니다.
  try {
    // 작성자명을 불러오는 함수입니다.
    const userNameString = sessionStorage.getItem("userInfo");
    const userInfo = JSON.parse(userNameString);

    // Firestore에서 "userInfo" 컬렉션을 참조하는 변수 생성
    const usersRef = collection(dbService, "userInfo");

    // "userInfo" 컬렉션에서 "name" 필드가 JSON.parse(userInfoString).name과 같은 문서만을 검색하는 쿼리를 생성합니다.
    const q = query(usersRef, where("name", "==", userInfo.name));

    // 생성한 쿼리를 Firestore에 실행하여 결과를 가져옵니다.
    const querySnapshot = await getDocs(q);

    // 검색된 문서들 중 첫 번째 문서의 ID를 추출합니다. (자동으로 주어진 문서 고유 ID)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    // 게시글의 객체를 생성합니다.
    const boardInfo = {
      // "userInfo" 컬렉션 안의 "name" 값을 사용합니다.
      name: userData.name,
      date: new Date(),
      title: document.querySelector("input[name='title']").value,
      content: document.querySelector("input[name='content']").value,
    };

    // Firestore의 "board" 컬렉션에 게시글을 추가합니다.
    const boardRef = collection(dbService, "board");
    const board = await addDoc(boardRef, boardInfo);

    // 게시글 작성에 성공하면 새로고침, 실패하면 알림창을 띄웁니다.
    if (board) {
      console.log(boardInfo);
      console.log(boardInfo.name);
      alert("게시글이 성공적으로 작성 되었습니다.");
    } else {
      alert("게시글 작성에 실패하였습니다.");
    }
  } catch (error) {
    console.error("오류가 발생했습니다: ", error);
    alert("게시글 작성 중 오류가 발생했습니다.");
    return false;
  }

  // 작성한 게시글을 화면에 반영합니다.
  const inputs = document.querySelectorAll(".container input");
  const inputsArr = Array.from(inputs);
  const addObj = {};
  "beforeend",
    `
  <tr>
              <td>랄로</td>
              <td>불편해.</td>
              <td>자세를 고쳐 앉아.</td>
            </tr>
  `;
});

// 게시글을 수정하는 함수입니다. (한 번에 한 개의 게시글씩 수정 가능)

// 게시글을 삭제하는 함수입니다. (한 번에 여러 개의 게시글 삭제 가능)
