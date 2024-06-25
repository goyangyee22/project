"https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
"https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { dbService } from "../../firebase.js";
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

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "./signIn.html";
}

// 작성한 게시글을 화면에 반영합니다.
async function getBoard() {
  const tableBody = document.querySelector("tbody");
  const querySnapshot = await getDocs(collection(db, "board"));
  querySnapshot.forEach((doc) => {
    // 게시글의 정보를 저장할 객체를 생성합니다.
    const data = doc.data();
    const { name, title, date } = data;
    const row = document.createElement("tr");
    row.setAttribute("data-id", doc.id);

    // 각 열에 데이터를 삽입합니다.
    row.innerHTML = `
    <td class="name">${name}</td>
    <td class="title">${title}</td>
    <td class="date">${date}</td>
    `;

    tableBody.append(row);

    row.addEventListener("click", () => {
      // 선택된 행을 표시합니다.
      const selectedRow = document.querySelector(".selected");
      if (selectedRow) {
        selectedRow.classList.remove("selected");
      }
      row.classList.add("selected");

      // 모달 창 내용을 업데이트 합니다.
      const modalTitleElement = document.querySelector(".modal-title");
      const modalContentElement = document.querySelector(".modal-content");

      modalTitleElement.textContent = title;
      modalContentElement.textContent = data.content;

      // 모달 창을 엽니다.
      const modal = document.querySelector("#modal");
      modal.style.display = "block";
    });

    tableBody.appendChild(row);
  });
}

// table에 클릭 이벤트를 생성합니다.
let selectedRow;
const tableTag = document.querySelector("table");
tableTag.addEventListener("click", function (e) {
  if (e.target.tagName != "TH" && e.target.tagName != "TABLE") {
    if (selectedRow) {
      selectedRow.classList.remove("selected");
    }
    e.target.parentElement.classList.add("selected");
    selectedRow = e.target.parentElement;
    console.log("현재 작성되어 있는 게시글의 정보: ", selectedRow);
  }
});

// 삭제 버튼을 클릭하면 게시글을 삭제 합니다.
const deleteBtn = document.querySelector(".deleteBtn");
deleteBtn.addEventListener("click", async () => {
  if (confirm("정말로 삭제 하시겠습니까?")) {
    if (selectedRow) {
      // 선택된 행에서 게시글의 docId를 가져옵니다.
      const postDocId = selectedRow.getAttribute("data-id");
      console.log("선택된 게시글의 docId: ", postDocId);

      if (postDocId) {
        try {
          // Firestore에서 해당 게시글 문서를 가져옵니다.
          const docRef = firestoreDoc(db, "board", postDocId);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            // 게시글 데이터에서 작성자의 docId를 가져옵니다.
            const userInfo = docSnapshot.data();
            const authorDocId = userInfo.authorDocId;
            console.log(userInfo);
            console.log("게시글 작성자의 docId: ", authorDocId);

            // 현재 sessionStorage에 로그인 되어있는 사용자의 정보를 가져옵니다.
            const currentUser = JSON.parse(sessionStorage.getItem("userInfo"));
            const currentUserDocId = currentUser.docId;
            console.log(
              "현재 로그인 되어있는 사용자의 docId: ",
              currentUserDocId
            );

            // 현재 sessionStorage에 로그인 되어있는 사용자의 docId와 게시글 작성자의 docId를 비교하여 일치하면 삭제합니다.
            if (currentUserDocId === authorDocId) {
              // Firebase에서 데이터를 삭제합니다.
              await dbService.collection("board").doc(postDocId).delete();
              console.log("게시글이 성공적으로 삭제되었습니다.");

              // 화면에 삭제한 게시글을 제거합니다.
              const boardRow = document.querySelector(
                `tr[data-id="${postDocId}"]`
              );
              if (boardRow) {
                boardRow.remove();
              }

              // 모달 창을 닫습니다.
              modal.style.display = "none";
            } else {
              console.log("삭제 권한이 없습니다.");
            }
          } else {
            console.error("해당 게시글을 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("게시글을 삭제하는 동안 오류가 발생했습니다.: ", error);
        }
      } else {
        console.error("게시글 ID를 찾을 수 없습니다.");
      }
    } else {
      console.error("선택된 게시글이 없습니다.");
    }
  }
});

// 수정 버튼 이벤트 리스너
const modifyBtn = document.querySelector(".modifyBtn");
modifyBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  const docId = modal.getAttribute("data-id");
  const titleElement = modal.querySelector(".modal-title");
  const contentElement = modal.querySelector(".modal-content");

  if (docId) {
    const newTitle = prompt("새 제목을 입력하세요:", titleElement.textContent);
    const newContent = prompt(
      "새 내용을 입력하세요:",
      contentElement.textContent
    );

    if (newTitle !== null && newContent !== null) {
      // Firestore에서 게시글을 수정합니다.
      db.collection("board")
        .doc(docId)
        .update({
          title: newTitle,
          content: newContent,
        })
        .then(() => {
          console.log("게시글이 성공적으로 수정되었습니다.");

          // DOM에서 게시글 제목과 내용을 업데이트합니다.
          titleElement.textContent = newTitle;
          contentElement.textContent = newContent;

          const boardRow = document.querySelector(`tr[data-id="${docId}"]`);
          if (boardRow) {
            boardRow.children[1].textContent = newTitle;
          }
        })
        .catch((error) => {
          console.error("게시글을 수정하는 데 오류가 발생하였습니다: ", error);
        });
    }
  } else {
    console.error("문서를 찾을 수 없습니다.");
  }
});

// 모달창 닫기 버튼을 클릭하면 모달 창을 닫습니다.
const closeBtn = document.querySelector(".closeBtn");
closeBtn.addEventListener("click", () => {
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
});

// 페이지를 로드하면 게시글을 불러옵니다.
window.onload = () => {
  getBoard();
};

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
  const authorDocId = userInfo.docId;

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
    authorDocId,
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
