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

function petroom(room) {
  console.log(room);
  const gallery = document.querySelector(".room-body");

  let createImgStr = `
                      <div class="swiper petroom">
                        <div class="swiper-wrapper" id="">
                    `;

  for (let i = 1; i < 9; i++) {
    createImgStr += `
                    <div class="swiper-slide roomimg">
                      <img src="./resources/images/petroom/${room}${i}.jpg" alt="" />
                    </div>
                    `;
  }
  createImgStr += `
                      </div>
                        <div class="swiper-pagination"></div>
                      </div>
                  `;
  gallery.innerHTML = createImgStr;

  var swiper1 = new Swiper(".petroom", {
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
// 주소 복사하기
function urlCopy() {
  var copyText = document.getElementById("text");
  copyText.style.display = "block";
  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value).then(
    function () {
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

  copyText.style.display = "none";
}

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
function Topbtn() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// 후기작성

// 게시글을 작성하는 함수입니다.
// const createBtn = document.getElementById("createBtn");
// createBtn.addEventListener("click", async (e) => {
//   // 이벤트 전파를 방지합니다.
//   e.preventDefault();
//   e.stopPropagation();

//   const createModal = document.getElementById("createModal");
//   createModal.style.display = "block";
// });

// // 모달창 닫기 버튼을 클릭하면 모달 창을 닫습니다.
// const closeBtn = document.querySelector(".closeBtn");
// closeBtn.addEventListener("click", () => {
//   const modal = document.querySelector("#createModal");
//   modal.style.display = "none";
// });

mapRendering();
