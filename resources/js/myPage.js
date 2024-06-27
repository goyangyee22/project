import { getDatas, updateDatas, deleteDatas } from "../../firebase.js";

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

if (!userInfo) {
  alert("로그인을 해주세요.");
  window.location.href = "./signIn.html";
}

// 로그아웃
document.getElementById("logout").addEventListener("click", function () {
  if (confirm("정말 로그아웃 하시겠습니까?")) {
    sessionStorage.removeItem("userInfo");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  }
});

// 회원정보표시
async function getMembers() {
  try {
    const snapshot = await getDatas("userInfo");

    let userData;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === userInfo.id) {
        userData = data;
      }
    });

    if (userData) {
      const { id, name, phone } = userData;
      const profileInfo = document.querySelector(".profile-info");
      const userName = document.getElementById("user-name");
      const userId = document.getElementById("user-id");

      profileInfo.innerHTML = `
        <table class="table">
          <tr>
            <th scope="row">아이디</th>
            <td>${id}</td>
          </tr>
          <tr>
            <th scope="row">이름</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th scope="row">전화번호</th>
            <td>${phone}</td>
          </tr>
        </table>
      `;

      userName.value = name;
      userId.value = id;
    }
  } catch (err) {
    console.log(err);
  }
}

// section 이동
const settingBtns = document.querySelectorAll(".setting-btn");
const sections = document.querySelectorAll("section");

settingBtns.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = this.getAttribute("data-section");

    sections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === targetSection) {
        section.classList.add("active");
      }
    });
  });
});

// 정보수정
const pwEx = /^[0-9A-Za-z\d$@$!%*?&]{4,16}/g;
const phoneEx = /^\d{3}-\d{4}-\d{4}$/;

const changeBtn = document.getElementById("change-info-btn");

changeBtn.addEventListener("click", async function () {
  const newPw = document.getElementById("new-pw");
  const newPwConfirm = document.getElementById("new-pw-confirm");
  const newPhone = document.getElementById("new-phone");

  // if (!pwEx.test(newPw.value)) {
  //   alert(
  //     '비밀번호 형식이 올바르지 않습니다. 4자-16자 사이의 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'
  //   );
  //   return false;
  // } else if (!phoneEx.test(newPhone.value)) {
  //   alert(
  //     '유효하지 않은 핸드폰 번호입니다. 핸드폰 번호 형식을 지켜주세요. \n ex) 010-1234-1234'
  //   );
  //   return false;
  // }

  // if (newPw.value !== newPwConfirm.value) {
  //   alert('비밀번호가 일치하지 않습니다.');
  //   return false;
  // }

  try {
    const updateInfo = {
      ...userInfo,
      pw: newPw.value,
      phone: newPhone.value,
    };

    await updateDatas("userInfo", userInfo.docId, updateInfo);

    sessionStorage.setItem(
      "userInfo",
      JSON.stringify({ ...userInfo, pw: newPw.value, phone: newPhone.value })
    );

    getMembers();

    newPw.value = "";
    newPwConfirm.value = "";
    newPhone.value = "";

    alert("정보가 성공적으로 변경되었습니다!");

    this.closest("section#change-info").classList.remove("active");
    sections[0].classList.add("active");
  } catch (error) {
    console.log(error);
  }
});

// 결제기록
async function getPayment() {
  try {
    const snapshot = await getDatas("payment");

    let paymentData = [];

    snapshot.docs.forEach((e) => {
      if (e.data().buyer.id == userInfo.id) {
        paymentData.push(e.data());
      }
    });

    const container = document.querySelector("#payment-record .contents");
    paymentData.forEach((payment) => {
      if (payment) {
        const { personnel, reservationDate, reservationTime, room, thumb } =
          payment.appointment;
        const { name, phone } = payment.buyer;
        const { amount, cashReceipts, dateOrdered, method } = payment.order;

        container.insertAdjacentHTML(
          "beforeend",
          `
          <div class="reservation-info content">
            <table class="table caption-top">
            <caption>예약정보</caption>
            <tbody>
              <tr>
                <td colspan="4">
                  <img src="../resources/images/${thumb}" alt="">
                </td>
              </tr>
              <tr>
                <th scope="row">예약공간</th>
                <td>${room}</td>
                <th>예약인원</th>
                <td>${personnel}명</td>
              </tr>
              <tr>
                <th scope="row">예약날짜</th>
                <td>${reservationDate}</td>
                <th>예약시간</th>
                <td>${reservationTime}</td>
              </tr>
              <tr>
                <th scope="row">예약자명</th>
                <td>${name}</td>
                <th>예약자 연락처</th>
                <td>${phone}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div class="payment-info content">
            <table class="table caption-top">
            <caption>결제정보</caption>
            <tbody>
              <tr>
                <th scope="row">결제일</th>
                <td>${dateOrdered}</td>
                <th>결제수단</th>
                <td>${method}</td>
              </tr>
              <tr>
                <th scope="row">결제금액</th>
                <td>${amount.toLocaleString()}원</td>
                <th>현금영수증</th>
                <td>${cashReceipts}</td>
              </tr>
            </tbody>
          </table>
          </div>
          `
        );
      }
    });

    if (paymentData == 0) {
      container.innerHTML = "결제내역이 없습니다.";
    }
  } catch (err) {
    console.log(err);
  }
}

// 작성글
const postWritten = document.querySelector(
  "#post-written .contents .post-group"
);
async function postRendering() {
  try {
    const snapshot = await getDatas("board");

    let postData = [];

    snapshot.docs.forEach((doc) => {
      if (doc.data().userDocId == userInfo.docId) {
        postData.push(doc.data());
      }
    });

    postData.forEach((post, idx) => {
      if (post) {
        const { name, date, title } = post;
        postWritten.insertAdjacentHTML(
          "beforeend",
          `
          <tr>
            <th scope="row">${idx + 1}</th>
            <td>${title}</td>
            <td>${name}</td>
            <td>${date}</td>
          </tr>
          `
        );
      }
    });

    if (postData.length == 0) {
      postWritten.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
          <td colspan='4'>작성한 글이 없습니다.</td>
        </tr>
        `
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// 사용자가 작성한 게시글을 가져오는 함수입니다.
async function fetchUserPosts() {
  try {
    // 로그인 되어있는 사용자의 sessionStorage에서 userDocId 값을 가져옵니다.
    const userInfoString = sessionStorage.getItem("userInfo");
    const user = JSON.parse(userNameString);
    const docId = user.docId;
    if (!userInfoString) {
      return false;
    }
    const userInfo = JSON.parse(userInfoString);
    const postsRef = collection(db, "board");
    const postDocs = await getDocs(postsRef);
    const postList = document.getElementById("postList");

    // 기존의 게시글 목록을 초기화합니다.
    if (postList) {
      postList.innerHTML = "";

      postDocs.forEach((doc) => {
        const data = doc.data();
        if (data.userDocId === userInfo.docId) {
          // sessionStorage의 userDocId 값과 작성자의 docId가 일치하면 작성글이 나타납니다.
          const listItem = document.createElement("li");
          listItem.innerHTML = `
      <div class="post-item">
          <div class="post-info">
            <span class="post-name">${data.name}</span>
            <span class="post-title">${data.title}</span>
            <span class="post-date">${data.date}</span>
          </div>
        </div>
      `;
          postList.appendChild(listItem);
        }
      });
    } else {
      console.log("게시글을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.log(error);
  }
}

// 회원탈퇴
const withdrawalBtn = document.getElementById("withdrawal-btn");
withdrawalBtn.addEventListener("click", async function () {
  // 체크박스에 체크가 되어있지 않으면 회원탈퇴를 할 수 없습니다.
  const withdrawalCheckbox = document.getElementById("withdrawal-checkbox");
  if (!withdrawalCheckbox.checked) {
    alert("안내사항에 동의하여야 회원 탈퇴를 할 수 있습니다.");
    return false;
  }
  // 삭제를 하기 전 확인 메세지를 표시합니다.
  if (confirm("정말 회원 탈퇴 하시겠습니까?")) {
    try {
      // 세션 스토리지에서 사용자 정보를 가져옵니다.

      if (userInfo) {
        await deleteDatas("userInfo", userInfo.docId);

        sessionStorage.removeItem("userInfo");

        alert("회원 탈퇴가 성공적으로 완료 되었습니다.");

        window.location.href = "../index.html";
      } else {
        throw new Error("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error(err);
      alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주십시오.");
    }
  }
});

getMembers();
getPayment();
postRendering();
