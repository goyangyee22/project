// var swiper = new Swiper(".mySwiper", {
//   loop: true,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });
import { getDatas, addDatas } from "../../firebase.js";

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
// 사진 더보기
// var swiper1 = new Swiper(".petroom", {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   // autoplay: {
//   //   delay: 2500,
//   //   disableOnInteraction: false,
//   // },
//   freeMode: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });
// 여러이미지 불러오기

// function petroom(room) {
//   console.log(room);
//   const gallery = document.querySelector(".room-body");

//   let createImgStr = `
//                       <div class="swiper petroom">
//                         <div class="swiper-wrapper" id="">
//                     `;

//   for (let i = 1; i < 9; i++) {
//     createImgStr += `
//                     <div class="swiper-slide roomimg">
//                       <img src="./resources/images/petroom/${room}${i}.jpg" alt="" />
//                     </div>
//                     `;
//   }
//   createImgStr += `
//                       </div>
//                         <div class="swiper-pagination"></div>
//                       </div>
//                   `;
//   gallery.innerHTML = createImgStr;

//   var swiper1 = new Swiper(".petroom", {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     loop: true,
//     // autoplay: {
//     //   delay: 2500,
//     //   disableOnInteraction: false,
//     // },
//     freeMode: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
// }
// // 주소 복사하기
// function urlCopy() {
//   var copyText = document.getElementById("text");
//   copyText.style.display = "block";
//   copyText.select();
//   copyText.setSelectionRange(0, 99999);

//   navigator.clipboard.writeText(copyText.value).then(
//     function () {
//       var copyMessage = document.getElementById("copyMessage");
//       copyMessage.classList.add("show");
//       setTimeout(function () {
//         copyMessage.classList.remove("show");
//       }, 1000);
//     },
//     function (err) {
//       console.error("Failed to copy: ", err);
//     }
//   );

//   copyText.style.display = "none";
// }

//메뉴버튼 숨기기'

const btn = document.getElementById("menu-b");
const menu = document.querySelector(".menu");
btn.addEventListener("click", function () {
  menu.classList.add("show-menus");
});

const closeEl = document.querySelector(".close");
closeEl.addEventListener("click", function () {
  menu.classList.remove("show-menus");
});

// 위로 가기 버튼
// function Topbtn() {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }
// 후기작성

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

const displaytext = document.getElementsByClassName("profil-scroll");
const input = document.getElementById("modalInput");
const textarr = document.getElementById("modaltexttarea");
const modalbtn = document.getElementById("modal-btn");
const open = document.getElementById("createBtn");

// 로그인을 하지 않았을 경우 접근 제한
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

//
const profilScroll = document.querySelector(".profil-scroll");
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
        profilScroll.insertAdjacentHTML(
          "beforeend",
          `
            <div class="Reviews-in">
                  <div class="customer">
                    <div></div>
                    <div class="profile-img">
                      <img src="./resources/images/petroom/사용자.jpg" alt="" />
                    </div>
                    <div>
                      <div class="name">${name}</div>
                      <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                      </div>
                      <div class="profile-title">
                        <p>
                         ${content}
                        </p>
                      </div>

                      <div class="date">${date}</div>
                    </div>
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

getBoard();

mapRendering();
