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

mapRendering();
