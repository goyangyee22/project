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

let accountSwiper = new Swiper('.account-slide ', {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

let cardSwiper = new Swiper('.card-slide ', {
  slidesPerView: 4,
  spaceBetween: 30,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
