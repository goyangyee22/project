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

mapRendering();
