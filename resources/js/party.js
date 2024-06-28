import { getDatas, addDatas } from "../../firebase.js";

const reviewContainer = document.querySelector(".guest-main-img");

async function getBoard() {
  try {
    const snapshot = await getDatas("board");

    let boardArr = [];
    for (let i = 0; i < 3; i++) {
      boardArr.push(snapshot.docs[i].data());
    }

    if (boardArr) {
      boardArr.forEach((el) => {
        const { content, name, title, date } = el;

        reviewContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="QnA-boxs">
            <span class="guest-imgx"
              ><i class="fa-regular fa-user guest-imgs"></i></span>
            <div class="QnA-num">
              <strong class="guest-name"
                >${name} <span>⭐⭐⭐⭐⭐</span></strong
              >
              <p class="QnA-ment">
                ${content}
              </p>
            
              <span class="QnA-time">${date}</span>
            </div>
          </div>
          `
        );
      });
    }
  } catch (err) {}
}

var swiper = new Swiper(".detail-slide-thumb", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".detail-slide", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const displaytext = document.getElementsByClassName("profil-scroll");
const input = document.getElementById("modalInput");
const textarr = document.getElementById("modaltexttarea");
const modalbtn = document.getElementById("modal-btn");
const open = document.getElementById("createBtn");

open.addEventListener("click", function () {
  if (!userInfo) {
    alert("로그인을 해주세요.");
    window.location.href = "./pages/signIn.html";
  }
});

// 데이터전송
modalbtn.addEventListener("click", async function () {
  try {
    const inputValue = input.value;
    const textarrvlue = textarr.value;
    const user = userInfo.name;
    const docId = userInfo.docId;
    const date = new Date().toLocaleDateString("ko-KR");

    const sendObj = {
      content: textarrvlue,
      date: date,
      name: user,
      title: inputValue,
      userDocId: docId,
    };

    const sendDatas = await addDatas("board", sendObj);

    if (sendDatas) {
      alert("게시글이 작성되었습니다.");
    } else {
      console.log("저장 실패");
      console.log(sendDatas);
    }
  } catch (error) {
    console.log(error);
  }
  // displaytext.textContent = inputValue;
});

const sectionMenus = document.querySelectorAll(".party-menu a");
let isScrolling = false;

function setActiveLink(link) {
  sectionMenus.forEach((a) => a.classList.remove("active"));
  link.classList.add("active");
}

sectionMenus.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    isScrolling = true;

    setActiveLink(link);

    const target = document.querySelector(link.getAttribute("href"));

    target.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
});

function urlCopy() {
  var copyText = document.getElementById("text");
  copyText.style.display = "block"; // 임시로 텍스트 보이게 함
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value).then(
    function () {
      // 복사 성공 시 메시지 표시
      var copyMessage = document.getElementById("copyMessage");
      copyMessage.classList.add("show");
      setTimeout(function () {
        copyMessage.classList.remove("show");
      }, 1000);
    },
    function (err) {
      console.error("Failed to copy: ", err);
    }
  );

  copyText.style.display = "none"; // 다시 텍스트 숨김
}

const copybutton = document.getElementById("urlCopy");
copybutton.addEventListener("click", urlCopy);

//------------------------------ 반응형 버튼
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("show-options");
  const menu = document.querySelector("#menumain"); // 메뉴 창 요소

  btn.addEventListener("click", function () {
    menu.classList.toggle("show-menus"); // show-menus 클래스를 toggle하여 보이기/숨기기
  });
});

getBoard();
mapRendering();
