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

// 작성한 게시글을 화면에 반영합니다.
async function getBoard() {
  const querySnapshot = await getDatas("board");
  const tableTag = document.querySelector("table");
  querySnapshot.forEach((doc) => {
    // 게시글의 정보를 저장할 객체를 생성합니다.
    const { name, title, content, date } = doc.data();

    // 해당 연도를 표시합니다.
    const year = date.getFullYear();

    // 해당 월을 표시하는 getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const month = date.getMonth() + 1;

    // 해당 일을 표시합니다.
    const day = date.getDate();

    tableTag.insertAdjacentHTML(
      "beforeend",
      `
      <tr data-id=${doc.id}>
      <td class="name">${name}</td>
      <td class="title">${title}</td>
      <td class="content">${content}</td>
      <td class="date">${`${year}년 ${month}월 ${day}일`}</td>
      </tr>
      `
    );
  });
}
getBoard();

// 게시글을 작성하는 함수입니다.
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  // 작성자명을 불러오는 함수입니다.
  const userNameString = sessionStorage.getItem("userInfo");
  const userInfo = JSON.parse(userNameString);
  const name = userInfo.name;

  // Firestore에서 "userInfo" 컬렉션을 참조하는 변수 생성
  const usersRef = collection(dbService, "userInfo");

  // "userInfo" 컬렉션에서 "name" 필드가 JSON.parse(userInfoString).name과 같은 문서만을 검색하는 쿼리를 생성합니다.
  const q = query(usersRef, where("name", "==", userInfo.name));

  // 생성한 쿼리를 Firestore에 실행하여 결과를 가져옵니다.
  const querySnapshot = await getDocs(q);

  // 검색된 문서들 중 첫 번째 문서의 ID를 추출합니다. (자동으로 주어진 문서 고유 ID)
  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();
  console.log(userData);

  // 제목, 내용의 입력값을 받아옵니다.
  const inputs = document.querySelectorAll(".form-container input");
  const inputsArr = Array.from(inputs);
  const addObj = {};
  inputsArr.forEach((input) => {
    addObj[name ,input.name, date] = input.value;
  });
  const result = await addDatas("board", addObj);

  const date = new Date();

  // 해당 연도를 표시합니다.
  const year = date.getFullYear();

  // 해당 월을 표시하는 getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const month = date.getMonth() + 1;

  // 해당 일을 표시합니다.
  const day = date.getDate();
  const {
    uploadName = name,
    title,
    content,
    uploadDate = `${year} ${month} ${day}`,
  } = addObj;
  const tableTag = document.querySelector("table");
  tableTag.firstElementChild.insertAdjacentHTML(
    "beforeend",
    `
    <tr data-id=${userInfo.docId}>
    <td class="name">${uploadName}</td>
    <td class="title">${title}</td>
    <td class="content">${content}</td>
    <td class="date">${uploadDate}</td>
    </tr>
    `
  );
  console.log(userInfo.docId, uploadName, title, content, uploadDate);
});

// 게시글을 수정하는 함수입니다. (한 번에 한 개의 게시글씩 수정 가능)

// 게시글을 삭제하는 함수입니다. (한 번에 여러 개의 게시글 삭제 가능)
