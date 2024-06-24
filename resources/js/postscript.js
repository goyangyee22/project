import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { dbService, getDatas, deleteDocument } from "../../firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc as firestoreDoc,
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
    // const { name, title, content, date } = doc.data();

    const data = doc.data();
    const date = data.date;
    const name = data.name;
    const title = data.title;
    const content = data.content;

    tableTag.insertAdjacentHTML(
      "beforeend",
      `
      <tr data-id=${doc.id}>
      <td class="name">${name}</td>
      <td class="title">${title}</td>
      <td class="content">${content}</td>
      <td class="date">${date}</td>
      </tr>
      `
    );
  });
}
getBoard();

// table에 클릭 이벤트를 생성합니다.
let updateTarget;
const tableTag = document.querySelector("table");
tableTag.addEventListener("click", function (e) {
  if (updateTarget) return false;
  if (e.target.tagName != "TH" && e.target.tagName != "TABLE") {
    e.target.parentElement.classList.toggle("selected");
  }
  console.log(e.target.parentElement);
});

// 게시글을 작성하는 함수입니다.
const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  // 제목과 내용 입력값을 가져옵니다.
  const titleInput = document.querySelector('input[name="title"]');
  const contentInput = document.querySelector('input[name="content"]');

  // 입력 필드의 값에서 양 끝 공백을 제거합니다.
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  // 제목과 내용이 모두 비어있는지 검사합니다.
  if (title === "" || content === "") {
    alert("제목과 내용을 모두 입력해주세요.");
    return;
  }

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

  // 제목, 내용의 입력값을 받아옵니다.
  const inputs = document.querySelectorAll(".form-container input");
  const addObj = {
    name,
    // 작성일 기준으로 고정합니다.
    date: new Date().toLocaleDateString("ko-KR"),
  };
  inputs.forEach((input) => {
    addObj[input.name] = input.value;
  });

  try {
    // Firebase에 데이터를 추가합니다.
    const docRef = await addDoc(collection(dbService, "board"), addObj);
    // 추가된 문서의 ID입니다.
    const docId = docRef.id;

    // 화면에 추가된 데이터를 표시합니다.
    const tableTag = document.querySelector("table");
    tableTag.firstElementChild.insertAdjacentHTML(
      "beforeend",
      `
      <tr data-id=${docId}>
      <td class="name">${addObj.name}</td>
      <td class="title">${addObj.title}</td>
      <td class="content">${addObj.content}</td>
      <td class="date">${addObj.date}</td>
      </tr>
      `
    );
    console.log(docId, addObj.name, addObj.title, addObj.content, addObj.date);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// 본인이 작성했던 게시글을 삭제하는 함수입니다. (한 번에 여러 개의 게시글 삭제 가능)
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", async function () {
  const selectedTrs = document.querySelectorAll(".selected");

  // 선택된 행에 대한 반복 처리
  selectedTrs.forEach(async (tr) => {
    const docId = tr.getAttribute("data-id");

    // 현재 로그인한 사용자의 정보를 sessionStorage에서 가져옴
    const currentUserInfoString = sessionStorage.getItem("userInfo");
    const currentUserInfo = JSON.parse(currentUserInfoString);
    const currentDocId = currentUserInfo.docId;

    try {
      // Firebase에서 해당 회원의 정보를 가져옵니다.
      const boardDoc = await getDoc(doc(dbService, "board", docId));
      if (!boardDoc.exists()) {
        throw new Error(`Document ${docId} not found.`);
      }

      // 회원 정보의 작성자 ID를 가져옵니다.
      const writerInfo = boardDoc.data().writerInfo;
      const writerDocId = writerInfo().docId;

      // 현재 로그인 되어있는 사용자와 작성자 ID가 일치하면 삭제합니다.
      if (currentDocId === writerDocId) {
        // 회원 정보를 삭제합니다.
        const result = await deleteDocument("board", docId);
        if (result) {
          tr.remove();
        } else {
          throw new Error("Delete operation failed.");
        }
      } else {
        throw new Error("You are not authorized to delete this member");
      }
    } catch (error) {
      console.error("Error deleting member: ", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    }
  });
});
