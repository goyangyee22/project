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
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// 회원가입 할 때 아이디, 비밀번호 및 핸드폰 번호에 대한 정규식입니다.
const idEx = /^[0-9a-z]{4,16}$/g;
const pwEx = /^[0-9A-Za-z\d$@$!%*?&]{4,16}/g;
const phoneEx = /^\d{3}-\d{4}-\d{4}$/;

// 아이디와 핸드폰 번호 중복 확인 및 버튼 클릭 여부를 체크하기 위해 변수를 생성합니다.
let idCheck = false;
let phoneCheck = false;
let buttonCheck = false;

// 로그인이 되어있는 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem("userInfo");
if (userInfo) {
  alert(
    "이미 로그인이 되어있습니다, 새로운 계정의 회원가입을 원하시는 경우 현재 계정을 로그아웃 하시고 새로운 계정의 회원가입을 해주시기 바랍니다."
  );
  window.location.href = "../index.html";
}

// ID 중복에 대한 함수를 정의합니다.
async function isIdDuplicate(event) {
  event.preventDefault();
  const id = document.querySelector("input[name='id']").value;

  // 정규식을 사용하여 아이디가 형식에 맞는지 검증합니다.
  const idConfirm = idEx.test(id);

  // ID가 조건에 맞게 입력되지 않으면 그에 따른 alert를 띄우기 위한 조건식을 설정합니다.
  if (!idConfirm) {
    alert("아이디가 4-16자 사이의 숫자 또는 영소문자가 아닙니다.");
    return false;
  }

  // Firestore에서 "userInfo" 컬렉션에서 입력한 아이디가 있는지 조회합니다.
  const usersRef = collection(dbService, "userInfo");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);

  // 중복 여부에 따라 idCheck 변수를 설정합니다.
  idCheck = !querySnapshot.empty ? false : true;
  buttonCheck = true;

  // 사용 가능한 아이디인지 또는 중복된 아이디인지 알립니다.
  if (idCheck) {
    alert("사용 가능한 아이디입니다.");
  } else {
    alert("중복된 아이디이거나 4-16자 사이의 숫자 또는 영소문자가 아닙니다.");
  }
}

// ID 중복확인 버튼에 이벤트 리스너를 등록합니다.
let isItDuplicate = document.querySelector("#duplicateId");
isItDuplicate.addEventListener("click", isIdDuplicate);

// 핸드폰 번호 중복에 대한 함수를 정의합니다.
async function isPhoneDuplicate(event) {
  event.preventDefault();
  const phone = document.querySelector("input[name='phone']").value;

  // 정규식을 사용하여 아이디가 형식에 맞는지 검증합니다.
  const phoneConfirm = phoneEx.test(phone);

  // ID가 조건에 맞게 입력되지 않으면 그에 따른 alert를 띄우기 위한 조건식을 설정합니다.
  console.log(phoneConfirm);
  if (!phoneConfirm) {
    alert("유효하지 않은 핸드폰 번호입니다.");
    return false;
  }

  // Firestore에서 "userInfo" 컬렉션에서 입력한 아이디가 있는지 조회합니다.
  const usersRef = collection(dbService, "userInfo");
  const q = query(usersRef, where("phone", "==", phone));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  // 중복 여부에 따라 idCheck 변수를 설정합니다.
  phoneCheck = !querySnapshot.empty ? false : true;
  buttonCheck = true;

  // 사용 가능한 아이디인지 또는 중복된 아이디인지 알립니다.
  if (phoneCheck) {
    alert("사용 가능한 핸드폰 번호입니다..");
  } else {
    alert("이미 누군가 사용중이거나 유효하지 않은 핸드폰 번호입니다.");
  }
}

// 핸드폰 번호 중복확인 버튼에 이벤트 리스너를 등록합니다.
let isNumberDuplicate = document.querySelector("#duplicatePhone");
isNumberDuplicate.addEventListener("click", isPhoneDuplicate);

// 회원가입 버튼을 클릭하면 처리하는 함수를 생성합니다.
async function handleSignUp() {
  // 폼에서 사용자가 입력한 값들을 가져옵니다.
  const name = document.forms["signUpForm"]["name"].value;
  const id = document.forms["signUpForm"]["id"].value;
  const pw = document.forms["signUpForm"]["pw"].value;
  const pwConfirm = document.forms["signUpForm"]["pwConfirm"].value;
  const phone = document.forms["signUpForm"]["phone"].value;

  // 입력 정보가 전부 입력 되어야만 회원가입을 할 수 있습니다.
  if (!name || !id || !pw || !pwConfirm || !phone) {
    alert("회원 정보는 전부 입력하여야 합니다.");
    return false;
  }
  console.log(idEx.test(id));
  // 정규식을 사용하여 아이디, 비밀번호, 핸드폰 번호를 검증합니다.
  if (!idEx.test(id)) {
    alert(
      "아이디 형식이 올바르지 않습니다. 영문자로 시작하는 4~16자의 영문자 또는 숫자를 입력하세요."
    );
    return false;
  }

  if (!pwEx.test(pw)) {
    alert(
      "비밀번호 형식이 올바르지 않습니다. 4자-16자 사이의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
    );
    return false;
  }

  if (!phoneEx.test(phone)) {
    alert("이미 누군가 사용중이거나 유효하지 않은 핸드폰 번호입니다.");
    return false;
  }

  // 중복확인 버튼이 클릭되었는지 확인합니다. (false == 0)
  if (buttonCheck == false) {
    alert("ID 중복확인을 해주십시오.");
    return false;
  }

  // 아이디가 중복되었는지 확인합니다.
  if (idCheck == false) {
    alert("중복된 아이디입니다.");
    return false;
  }

  // 비밀번호와 비밀번호 확인이 일치하지 않으면 회원가입이 되지 않습니다.
  if (pw !== pwConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  // 핸드폰 번호가 중복되었는지 확인합니다.
  if (phoneCheck == false) {
    alert("이미 누군가 사용중이거나 유효하지 않은 핸드폰 번호입니다.");
    return false;
  }

  return true;

  // 중복되지 않는 ID일 경우 Firestore에 데이터를 저장합니다.
  // 데이터를 저장하는 위치는 Firebase의 "userInfo" 컬렉션입니다.
}

// 회원 목록 조회 함수
async function getMembers() {
  console.log("getMembers 함수 시작");
  const snapshot = await getDatas("userInfo");
  snapshot.forEach((doc) => {
    const { name, id, pw, phone } = doc.data();
    console.log(`Name: ${name}, ID: ${id}`);
  });
  console.log("getMembers 함수 종료");
}

// 멤버조회 및 이벤트 핸들러를 등록합니다.
console.log("handleTrClick 함수 호출");
function getMembersHandlerTrClick() {
  getMembers().then(() => {});
  console.log("handleTrClick 함수 종료");
}

// 회원가입 버튼에 클릭 이벤트 리스너를 등록합니다.
const signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", async function () {
  const pwCheck = await handleSignUp(); // 회원가입 처리 함수를 호출합니다.(비밀번호와 비밀번호 확인이 같은 지 확인)

  console.log(pwCheck);
  if (!pwCheck) {
    return;
  }

  signUpButton.removeEventListener("click", this);

  // 사용자 정보 객체를 생성합니다.
  const userInfo = {
    name: document.querySelector("input[name='name']").value,
    id: document.querySelector("input[name='id']").value,
    pw: document.querySelector("input[name='pw']").value,
    phone: document.querySelector("input[name='phone']").value,
  };

  const result = await addDatas("userInfo", userInfo);
  try {
    // Firebase에 사용자 정보 객체를 추가합니다.
    const usersRef = collection(dbService, "userInfo");
    const q = query(usersRef, where("id", "==", userInfo.id));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    let sessionUserInfo = { ...userDoc.data(), docId: userDoc.id };
    alert("회원가입이 완료되었습니다.");
    saveSession(sessionUserInfo);
    window.location.href = "../pages/myPage.html";
  } catch (error) {
    console.error("오류가 발생했습니다: ", error);
    alert("회원가입 중 오류가 발생했습니다.");
    return false;
  }

  // 처리 결과에 따른 회원 목록 조회 함수 또는 실패 메세지를 표시합니다.
  result ? getMembersHandlerTrClick() : alert("저장을 실패했습니다");
});

// 초기화 로드를 하는 경우 회원 목록을 조회하는 함수를 호출합니다.
getMembersHandlerTrClick();

// 로그인이 되면 세션을 저장합니다.
function saveSession(userInfo) {
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
}

// 로그인이 되어있는지 확인합니다.
function isLoggedIn() {
  return sessionStorage.getItem("userInfo") !== null;
}

// 로그아웃이 되면 세션을 제거합니다.
function logout() {
  sessionStorage.removeItem("userInfo");
}
