import { getDatas, addDatas } from "../../firebase.js";

const reviewContainer = document.querySelector(".guest-main-img");

async function getBoard() {
  try {
    const snapshot = await getDatas("board");

    let boardArr = [];
    for (let i = 0; i < 3; i++) {
      boardArr.push(snapshot.docs[i].data());
    }

    console.log(boardArr);

    if (boardArr) {
      boardArr.forEach((el) => {
        const { content, name, title, date } = el;
        console.log("name", name);
        reviewContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="QnA-boxs">
            <span class="guest-imgx"
              ><img
                class="guest-imgs"
                src="resources/images/partyimg/게스트이미지1.jpg"
            /></span>
            <div class="QnA-num">
              <strong class="guest-name"
                >${name} <span>⭐⭐⭐⭐⭐</span></strong
              >
              <p class="QnA-ment">
                ${content}
              </p>
              <img
                src="resources/images/partyimg/후기1.jpg"
                width="56px"
                height="56px"
              />
              <span class="QnA-time">${date}</span>
            </div>
          </div>
          `
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
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

function partyroom(room) {
  console.log(room);
  const gallery = document.querySelector(".party-body");

  let createImgStr = `
      <div class="swiper partyrooms">
        <div class="swiper-wrapper" id="">
          `;

  for (let i = 1; i < 6; i++) {
    createImgStr += `
            <div class="swiper-slide roomimg1">
              <img src="resources/images/partyimg/${room}${i}.jpg" alt="" />
              </div>
              `;
  }
  createImgStr += `
            </div>
            <div class="swiper-pagination"></div>
            </div>
            `;
  gallery.innerHTML = createImgStr;

  var swiper1 = new Swiper(".partyrooms", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

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
