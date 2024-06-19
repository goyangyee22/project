var swiper = new Swiper('.hero-swiper', {
  spaceBetween: 30,
  effect: 'fade',
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

mapRendering();

// 옵션 리스트

const commonOps = [
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
];
const partyOps = [
  { icon: 'dress', text: '드레스의상' },
  { icon: 'retro', text: '레트로 사진기' },
  { icon: 'dice', text: '보드게임' },
  { icon: 'burner', text: '주방시설' },
  { icon: 'utensils', text: '식기류' },
  { icon: 'kitchen-set', text: '조리도구' },
];

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
];
