import { addDatas, getDatas } from '../../firebase.js  ';

// 결제할 은행 & 카드 선택
const bankNames = [
  '농협은행',
  '신한은행',
  '기업은행',
  '하나은행',
  '우리은행',
  '국민은행',
];
const cardNames = [
  '삼성카드',
  '현대카드',
  '롯데카드',
  'BC카드',
  '카카오뱅크',
  '토스뱅크',
];

function addRandomSlide(arr, swiper, slideName) {
  return function () {
    const randomItem = arr[Math.floor(Math.random() * arr.length)];

    const swiperWrapper = document.querySelector(slideName);

    swiperWrapper.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="swiper-slide">
          <button class="method-btn">
            ${randomItem}
          </button>
        </div>
      `
    );
    swiper.update();
  };
}

let accountSwiper = new Swiper('.account-slide ', {
  slidesPerView: 2,
  spaceBetween: 8,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});

let cardSwiper = new Swiper('.card-slide ', {
  slidesPerView: 2,
  spaceBetween: 8,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
  },
});

const addAccountBtn = document.getElementById('add-account');
const addCardBtn = document.getElementById('add-card');

addAccountBtn.addEventListener(
  'click',
  addRandomSlide(bankNames, accountSwiper, '.account-slide-wrapper')
);
addCardBtn.addEventListener(
  'click',
  addRandomSlide(cardNames, cardSwiper, '.card-slide-wrapper')
);

const commonBtns = document.querySelectorAll('.common-btn');
const commonMethod = document.querySelectorAll('.common-method');

commonBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    const target = btn.getAttribute('data-target');

    commonMethod.forEach((method) => {
      if (method.classList.contains(`${target}-pay`)) {
        method.classList.add('show-common-method');
      } else {
        method.classList.remove('show-common-method');
      }
    });
  });
});

const userInfo = sessionStorage.getItem('userInfo');
if (!userInfo) {
  alert('로그인을 해주세요.');
  window.location.href = './signIn.html';
}

async function getUsers() {
  try {
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
      const buyer = {
        userId: id,
        userName: name,
        userPhone: phone,
      };
      sessionStorage.setItem('buyer', JSON.stringify(buyer));
    }
  } catch (error) {
    console.log(error);
  }

  function displayUserData(name, phone) {
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-phone').textContent = phone;
  }

  const paymentInfoJSON = sessionStorage.getItem('paymentInfo');
  const buyerJSON = sessionStorage.getItem('buyer');

  if (buyerJSON && paymentInfoJSON) {
    const paymentInfo = JSON.parse(paymentInfoJSON);
    const buyer = JSON.parse(buyerJSON);

    const { date, room, amount, personnel, time, thumb } = paymentInfo;
    const { userId, userName, userPhone } = buyer;

    document.getElementById('display-date').textContent = date;
    document.getElementById('display-thumb').innerHTML = `
      <img src="../resources/images/${thumb}" alt="">
    `;
    document.getElementById('display-time').textContent = time;
    document.getElementById('display-room').textContent = room;
    document.getElementById('display-personnel').textContent = personnel;

    function displayCost(el) {
      document.querySelector(el).textContent =
        parseInt(amount).toLocaleString();
    }

    // 가격 표시
    displayCost('#display-amount');
    displayCost('#total-cost span');

    // 결제수단 선택
    const paymentMethod = document.getElementById('paymentMethod');
    const methodBtn = document.querySelectorAll('input[name="method"]');
    methodBtn.forEach((method) => {
      method.addEventListener('change', function (e) {
        paymentMethod.value = e.target.value;
        document.getElementById('select-method').textContent = e.target.value;
      });
    });

    // 결제 정보 전송
    document
      .getElementById('payment-data-send')
      .addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = e.target;
        const chooseMethod = formData.paymentMethod.value;

        const orderData = {
          amount: parseInt(amount),
          dateOrdered: new Date().toLocaleString(),
          method: chooseMethod,
        };

        const paymentData = {
          appointment: {
            reservationDate: date,
            personnel: personnel,
            room: room,
            reservationTime: time,
            thumb: thumb,
          },
          buyer: {
            id: userId,
            name: userName,
            phone: userPhone,
          },
          order: orderData,
        };

        // 파이어베이스에 데이터 추가
        const sendDatas = await addDatas('payment', paymentData);

        if (sendDatas) {
          sessionStorage.removeItem('buyer');
          sessionStorage.removeItem('paymentInfo');
          window.location.href = './myPage.html';
        } else {
          console.log('저장 실패');
          console.log(sendDatas);
        }
      });
  }
}

document.addEventListener('DOMContentLoaded', getUsers);

const radioBtns = document.querySelectorAll('input[name="method"]');

radioBtns.forEach((radio) => {
  radio.addEventListener('change', function () {
    document.querySelectorAll('.display-method').forEach((div) => {
      div.classList.remove('show-method');
    });
    document.querySelectorAll('.method-option').forEach((swiper) => {
      swiper.classList.remove('display-method-option');
    });

    let methodData = radio.getAttribute('data-method');

    const selectedMethod = document.querySelector(`#display-${methodData}`);
    if (selectedMethod) {
      selectedMethod.classList.add('show-method');
      const swiperContainer = selectedMethod.querySelector('.method-option');
      if (swiperContainer) {
        swiperContainer.classList.add('display-method-option');
      }
    }
  });
});
