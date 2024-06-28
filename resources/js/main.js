let heroSwiper = new Swiper('.hero-swiper', {
  spaceBetween: 30,
  effect: 'fade',
  speed: 600,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

let previewSwiper = new Swiper('.preview-slide', {
  loop: true,
  speed: 10000,
  slidesPerView: 1,
  spaceBetween: 16,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});

// gsap
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.utils.toArray('.animateY').forEach((element, index) => {
  let delay = index * 0.2;
  gsap.fromTo(
    element,
    { opacity: 0, y: -50 },
    {
      opacity: 1,
      y: 0,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 10%',
      },
    }
  );
});

gsap.utils.toArray('.side-animate').forEach((el, idx) => {
  let direction = idx % 2 === 0 ? -100 : 100;
  gsap.fromTo(
    el,
    { opacity: 0, x: direction },
    {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 10%',
      },
    }
  );
});

gsap.utils.toArray('.icon-animate').forEach((element, index) => {
  let delay = index * 0.5;
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      delay: delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'top 10%',
      },
    }
  );
});

gsap.to('.top-btn', {
  scrollTrigger: {
    trigger: document.body,
    start: 'top+=100vh',
    toggleActions: 'play none none reverse',
  },
  x: 0,
  opacity: 1,
  duration: 0.5,
});

document.querySelector('.top-btn').addEventListener('click', () => {
  gsap.to(window, {
    scrollTo: { y: 0, autoKill: false },
    duration: 1,
  });
});

// 옵션 리스트
const infoOptions = [
  {
    section: 'common',
    list: [
      { icon: 'car', text: '주차가능' },
      { icon: 'wifi', text: '와이파이' },
      { icon: 'building', text: '독채건물' },
      { icon: 'elevator', text: '엘리베이터' },
      { icon: 'toilet', text: '내부화장실' },
      { icon: 'temperature-arrow-down', text: '냉장고' },
      { icon: 'square', text: '빔프로젝터' },
      { icon: 'volume-high', text: '블루투스 스피커' },
      { icon: 'glass-water-droplet', text: '얼음정수기' },
      { icon: 'rotate', text: '공기청정기' },
      { icon: 'wind', text: '천장형 에어컨' },
    ],
  },
  {
    section: 'party',
    list: [
      { icon: 'person-dress', text: '드레스의상' },
      { icon: 'camera-retro', text: '레트로 사진기' },
      { icon: 'dice', text: '보드게임' },
      { icon: 'fire-burner', text: '주방시설' },
      { icon: 'utensils', text: '식기류' },
      { icon: 'kitchen-set', text: '조리도구' },
    ],
  },
  {
    section: 'meeting',
    list: [
      { icon: 'tv', text: '대형스크린' },
      { icon: 'display', text: '55인치 TV' },
      { icon: 'volume-high', text: '스피커' },
      { icon: 'chalkboard-user', text: '화이트보드' },
      { icon: 'microphone', text: '무선마이크' },
      { icon: 'thumbtack', text: '삼각대' },
      { icon: 'mug-saucer', text: '티/커피' },
    ],
  },
  {
    section: 'pet',
    list: [
      { icon: 'display', text: 'TV' },
      { icon: 'fire-burner', text: '주방시설' },
      { icon: 'utensils', text: '식기류' },
      { icon: 'kitchen-set', text: '조리도구' },
      { icon: 'mattress-pillow', text: '침구류' },
      { icon: 'stairs', text: '계단슬라이드' },
      { icon: 'tape', text: '클리너테이프' },
      { icon: 'spray-can-sparkles', text: '탈취제' },
      { icon: 'sheet-plastic', text: '배변패드' },
    ],
  },
];

function createList(options, element) {
  const targetEl = document.querySelector(element + '> ul');
  let liContent = '';
  options.forEach((section) => {
    section.list.forEach((list) => {
      liContent += `
        <li>
          <i class="fa-solid fa-${list.icon}"></i>
            <span>${list.text}</span>
          </li>
      `;
    });
  });

  targetEl.innerHTML = liContent;
}

infoOptions.forEach(({ section }) => {
  createList(
    infoOptions.filter((opt) => opt.section === section),
    `#option-${section}`
  );
});

/* 메뉴 클릭 시 섹션 이동 */
const sectionMenus = document.querySelectorAll('#section-menu a');
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

mapRendering();
