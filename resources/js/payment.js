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

const date = sessionStorage.getItem('date');
const room = sessionStorage.getItem('room');
const time = sessionStorage.getItem('time');
const personnel = sessionStorage.getItem('personnel');
const amount = sessionStorage.getItem('amount');

document.getElementById('display-date').textContent = date;
document.getElementById('display-time').textContent = time;
document.getElementById('display-room').textContent = room;
document.getElementById('display-personnel').textContent = personnel;
document.getElementById('display-amount').textContent = amount;

document.getElementById('payment').addEventListener('submit', function (e) {
  e.preventDefault();

  const cardNum1 = document.getElementById('card-number1').value;
  const cardNum2 = document.getElementById('card-number2').value;
  const cardNum3 = document.getElementById('card-number3').value;
  const cardNum4 = document.getElementById('card-number4').value;

  const cardNumber = cardNum1 + cardNum2 + cardNum3 + cardNum4;

  // test
  if (SubmitEvent) {
    console.log({
      date: date,
      room: room,
      time: time,
      personnel: personnel,
      amount: amount,
      cardNumber: cardNumber,
    });
    sessionStorage.clear();
    window.location.href = './myPage.html';
  } else {
    console.log('저장 실패');
  }

  // 데이터베이스 저장
  // 데이터 전송 후 마이페이지로 이동해 결제 내역이 표시되게끔 한다.
});
