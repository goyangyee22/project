var swiper = new Swiper(".meeting-slide", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".meeting-medium", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const sectionMenus = document.querySelectorAll("#meet-menu a");
let isScrolling = false;

// function setActiveLink(link) {
//   sectionMenus.forEach((a) => a.classList.remove("active"));
//   link.classList.add("active");
// }

sectionMenus.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    isScrolling = true;

    // setActiveLink(link);

    const target = document.querySelector(link.getAttribute("href"));

    target.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
});

// ----------------------------
function meeting(room) {
  console.log(room);
  const gallery = document.querySelector(".meeting-pohoto");

  let createImgStr = `
                      <div class="swiper meeting1">
                        <div class="swiper-wrapper" id="">
                    `;

  for (let i = 1; i < 4; i++) {
    createImgStr += `
                    <div class="swiper-slide meeting2">
                   <img src="./resources/images/meeting/${room}${i}.jpg" alt="" />
                    </div>
                    `;
  }
  createImgStr += `
                      </div>
                        <div class="swiper-pagination"></div>
                      </div>
                  `;
  gallery.innerHTML = createImgStr;

  var swiper1 = new Swiper(".meeting1", {
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

// ---------------------------- 주소복사
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

//------------------------------ 반응형 버튼
const btn = document.getElementById("show-options");
const menu = document.querySelector(".menu");

btn.addEventListener("click", function () {
  menu.classList.add("show-menus");
});

const closeEl = document.querySelector(".close");
closeEl.addEventListener("click", function () {
  menu.classList.remove("show-menus");
});

mapRendering();
