// var swiper = new Swiper(".mySwiper", {
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

mapRendering();
