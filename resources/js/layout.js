var swiper = new Swiper('.detail-slide-thumb', {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper('.detail-slide', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiper,
  },
});

const sectionMenus = document.querySelectorAll('.detail-menu a');
let isScrolling = false;

function setActiveLink(link) {
  sectionMenus.forEach((a) => a.classList.remove('active'));
  link.classList.add('active');
}

sectionMenus.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    isScrolling = true;

    setActiveLink(link);

    const target = document.querySelector(link.getAttribute('href'));

    target.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  });
});
