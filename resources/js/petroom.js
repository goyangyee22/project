var swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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
document.getElementById();
//
mapRendering();
