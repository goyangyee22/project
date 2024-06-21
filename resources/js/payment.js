import { addDatas, getDatas } from '../../firebase.js  ';

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem('userInfo');
if (!userInfo) {
  alert('로그인을 해주세요.');
  window.location.href = './signIn.html';
}

async function getUsers() {
  try {
    // const userId = firebase.auth().currentUser.uid;
    const snapshot = await getDatas('userInfo');

    let userData;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === JSON.parse(userInfo).id) {
        userData = data;
      }
    });

    if (userData) {
      const { id, name, phone } = userData;
      displayUserData(name, phone);
      sessionStorage.setItem('id', id);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayUserData(name, phone) {
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-phone').textContent = phone;
}

const paymentInfoJSON = sessionStorage.getItem('paymentInfo');

if (paymentInfoJSON) {
  const paymentInfo = JSON.parse(paymentInfoJSON);

  const date = paymentInfo.date;
  const room = paymentInfo.room;
  const time = paymentInfo.time;
  const personnel = paymentInfo.personnel;
  const amount = paymentInfo.amount;

  document.getElementById('display-date').textContent = date;
  document.getElementById('display-time').textContent = time;
  document.getElementById('display-room').textContent = room;
  document.getElementById('display-personnel').textContent = personnel;

  function displayCost(id) {
    document.getElementById(id).textContent = parseInt(amount).toLocaleString();
  }

  /* 가격 표시 */
  displayCost('display-amount');
  displayCost('amount-of-payment');
  displayCost('total-cost');

  document
    .getElementById('final-payment-btn')
    .addEventListener('click', function (e) {
      e.preventDefault();

      // test
      if (SubmitEvent) {
        console.log({
          date: date,
          room: room,
          time: time,
          personnel: personnel,
          amount: amount,
        });
        sessionStorage.removeItem('paymentInfo');
        window.location.href = './myPage.html';
      } else {
        console.log('저장 실패');
      }

      // 데이터베이스 저장
      // 데이터 전송 후 마이페이지로 이동해 결제 내역이 표시되게끔 한다.
    });
}
const radioBtns = document.querySelectorAll('input[name="method"]');

radioBtns.forEach((radio) => {
  radio.addEventListener('change', function () {
    document.querySelectorAll('.display-method').forEach((div) => {
      div.classList.remove('show-method');
    });
    document.querySelectorAll('.swiper').forEach((swiper) => {
      swiper.classList.remove('display-swiper');
    });

    const selectedMethod = document.querySelector(`#display-${this.value}`);
    if (selectedMethod) {
      selectedMethod.classList.add('show-method');
      const swiperContainer = selectedMethod.querySelector('.swiper');
      if (swiperContainer) {
        swiperContainer.classList.add('display-swiper');
      }
    }
  });
});

let accountSwiper = new Swiper('.account-slide ', {
  slidesPerView: 4,
  spaceBetween: 16,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

let cardSwiper = new Swiper('.card-slide ', {
  slidesPerView: 4,
  spaceBetween: 16,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// payment: {
//   appointment: {
//     date: '예약날짜',
//     personnel: '인원',
//     room: '방 이름',
//     time: '예약시간'
//   },
//   buyer: {
//     id: '아이디',
//     name: '이름',
//     phone: '전화번호'
//   },
//   order: {
//     amount: 금액,
//     cashReceipts: '현금영수증 신청 여부(true or false)',
//     method: '결제수단',
//     time: '주문한 날짜'
//   }
// }

document.addEventListener('DOMContentLoaded', getUsers);
