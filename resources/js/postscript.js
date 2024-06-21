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
    // const { name, title, content, date } = doc.data();

    const data = doc.data();
    const name = data.name;
    const title = data.title;
    const content = data.content;
    const date = new Date();
    // 해당 연도, 월, 일을 표시하는데, 해당 월을 표시하는 getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    tableTag.insertAdjacentHTML(
      "beforeend",
      `
      <tr data-id=${doc.id}>
      <td class="name">${name}</td>
      <td class="title">${title}</td>
      <td class="content">${content}</td>
      <td class="date">${year}. ${month}. ${day}.</td>
      </tr>
      `
    );
    // console.log(doc.id);
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
  // const inputsArr = Array.from(inputs);
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

// 본인이 작성했던 게시글을 수정하는 함수입니다. (한 번에 한 개의 게시글씩 수정 가능)
const modifyBtn = document.getElementById("modifyBtn");
modifyBtn.addEventListener("click", async function () {});

// 본인이 작성했던 게시글을 삭제하는 함수입니다. (한 번에 여러 개의 게시글 삭제 가능)
const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", async function () {
  const selectedTrs = document.querySelectorAll(".selected");
  selectedTrs.forEach(async (tr) => {
    const docId = tr.getAttribute("data-id");
    // 작성자의 sessionStorage에서 docId를 가져옵니다.
    // selected 되어있는 칸에서 이 작성자의 docId를 가져오면 됨
    // const userInfoString = sessionStorage.getItem("userInfo");
    // const userInfo = JSON.parse(userInfoString);
    const writerDocId = docId;

    // 현재 로그인한 본인의 sessionStorage에서 docId를 가져옵니다.
    const currentUserInfoString = sessionStorage.getItem("userInfo");
    const currentUserInfo = JSON.parse(currentUserInfoString);
    const currentDocId = currentUserInfo.docId;

    // 작성자와 현재 로그인한 본인의 docId가 같아야 삭제가 됩니다.
    if (writerDocId == currentDocId) {
      try {
        const result = await deleteDatas("board", docId);
        if (result) {
          tr.remove();
        } else {
          alert(
            "삭제 중 오류가 발생했습니다. 관리자에게 문의하여 주시기 바랍니다."
          );
        }
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert(
          "삭제 중 오류가 발생했습니다. 관리자에게 문의하여 주시기 바랍니다."
        );
      }
    } else {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
    }
  });
});
