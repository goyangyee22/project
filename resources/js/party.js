var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// const btn = document.getElementById("popupBtn");
// const modal = document.getElementById("modalnum");
// const closeBtn = document.getElementById("closebutton");
// btn.onclick = function () {
//   modal.style.display = "block";
// };

// closeBtn.onclick = function () {
//   modal.style.display = "none";
// };

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };

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

// function urlCopy() {
//   var url = document.getElementById("text");
//   url.style.display = "block"; // 숨겨둔 input 태그 block처리
//   url.select(); // 복사할 text 블럭
//   document.execCommand("copy"); // 드레그된 text 클립보드에 복사

//   url.style.display = "none"; // 다시 숨기기
//   // alert("주소가 복사 되었습니다.");
// }

mapRendering();
