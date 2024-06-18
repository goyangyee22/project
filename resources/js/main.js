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

// 지도
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(36.328772, 127.423009), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options);

// 마커가 표시될 위치입니다
var markerPosition = new kakao.maps.LatLng(36.328772, 127.423009);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

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

const options = [
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
