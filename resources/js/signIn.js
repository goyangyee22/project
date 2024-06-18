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

const signInButton = document.getElementById("signInButton");

signInButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const pw = document.getElementById("pw").value;

  // Firestore에서 사용자의 정보를 검색합니다.
  const usersRef = collection(db, "userInfo");
  const q = query(usersRef, where("id", "==", id));

  try {
    
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Firestore에서 찾은 사용자 정보
      const userDoc = querySnapshot.docs[0];
      const userInfo = {...userDoc.data(), docId: userDoc.id};
      console.log(userInfo);
      // 비밀번호를 비교합니다.
      if (userInfo.pw === pw) {
        alert(`${userInfo.name}님이 로그인 하셨습니다!`);
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        window.location.href = "../index.html";
      } else {
        alert("아이디 또는 비밀번호가 잘못되었거나 공백입니다.");
      }
    } else {
      alert("아이디 또는 비밀번호가 잘못되었거나 공백입니다.");
    }
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});
