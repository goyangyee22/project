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
// 주소
// 사진 더보기
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
// 여러이미지 불러오기
const sweet = document.getElementById("roomimg");
for (let i = 1; i < 9; i++) {
  sweet.insertAdjacentHTML(
    "beforeend",
    `

                  <img src="./resources/images/petroom/스위트${i}.jpg" alt="" />
            
  `
  );
}

mapRendering();
