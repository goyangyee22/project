import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  deleteDatas,
} from "../../firebase.js";

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

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "./signIn.html";
}

// 사용자의 이름을 기반으로 마이페이지에 접속하면 사용자의 이름 + 마이페이지입니다. 라는 문구가 출력됩니다.
async function getMembers() {
  const usersRef = collection(db, "userInfo");
  const q = query(usersRef, where("name", "==", JSON.parse(userInfo).name));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const { name } = doc.data();
    console.log(`${name}님의 마이페이지입니다.`);
    const nameSpan = document.querySelector(".myPageMyName span");

    // 마이페이지에 접속한 경우 우측 상단에 (이름)님의 마이페이지라는 텍스트를 띄웁니다.
    nameSpan.textContent = `${name}님의 마이페이지입니다.`;
  });
}
getMembers();

// 후기를 작성할 수 있는 곳으로 이동하는 버튼클릭 함수
const postscript = document.getElementById("postscript");
postscript.addEventListener("click", function () {
  window.location.href = "postscript.html";
});

// 결제목록 버튼클릭 함수
const payment = document.getElementById("payment");
payment.addEventListener("click", function () {
  window.location.href = "payment.html";
});

// 비밀번호 변경 버튼클릭 함수
const changePassword = document.getElementById("changePassword");
changePassword.addEventListener("click", function () {
  window.location.href = "changePassword.html";
});

// 로그아웃 버튼클릭 함수
const logOut = document.getElementById("logOut");
logOut.addEventListener("click", function () {
  if (confirm("정말 로그아웃 하시겠습니까?")) {
    sessionStorage.removeItem("userInfo");
    alert("로그아웃 되었습니다.");
    window.location.href = "../index.html";
  }
});

// 회원탈퇴 버튼클릭 함수 (getDocs를 이용하여 만들 것)
const deleteId = document.getElementById("deleteId");
deleteId.addEventListener("click", async function () {
  // 삭제를 하기 전 확인 메세지를 표시합니다.
  if (confirm("정말 회원 탈퇴 하시겠습니까?")) {
    try {
      // 세션 스토리지에서 사용자 정보를 가져옵니다.
      const userInfoString = sessionStorage.getItem("userInfo");
      console.log(JSON.parse(userInfoString).id);

      // Firestore에서 "userInfo" 컬렉션을 참조하는 변수 생성
      const usersRef = collection(db, "userInfo");

      // "userInfo" 컬렉션에서 "id" 필드가 JSON.parse(userInfoString).id와 같은 문서만을 검색하는 쿼리를 생성합니다.
      const q = query(
        usersRef,
        where("id", "==", JSON.parse(userInfoString).id)
      );

      // 생성한 쿼리를 Firestore에 실행하여 결과를 가져옵니다.
      const querySnapshot = await getDocs(q);

      // 검색된 문서들 중 첫 번째 문서의 ID를 추출합니다. (자동으로 주어진 문서 고유 ID)
      const docId = querySnapshot.docs[0].id;
      console.log(docId);

      // 세션 스토리지에 사용자 정보가 있는지 확인합니다.
      if (userInfoString) {
        // 세션 스토리지에 저장된 사용자 정보를 객체로 전환합니다.
        const userInfo = JSON.parse(userInfoString);

        // 사용자의 ID 및 컬렉션 "userInfo"를 불러옵니다.
        const collectionName = "userInfo";

        // Firebase에서 사용자 정보 삭제
        await deleteDatas(collectionName, docId);

        // 세션 스토리지에서 사용자 정보 제거
        sessionStorage.removeItem("userInfo");

        // 회원 탈퇴가 완료되었음을 알리는 메세지 표시
        alert("회원 탈퇴가 성공적으로 완료 되었습니다.");

        // 회원 탈퇴 후 메인 페이지로 이동
        window.location.href = "../index.html";
      } else {
        // 세션 스토리지에 사용자 정보가 없으면 오류 메세지 표시
        throw new Error("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      // 오류가 발생하면 콘솔에 오류를 출력하고 오류 메세지 표시
      console.error("회원 탈퇴 중 오류 발생: ", error);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주십시오.");
    }
  }
});
