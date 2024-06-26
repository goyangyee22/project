import { addDatas, getDatas } from '../../firebase.js  ';

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

    function displayCost(id) {
      document.getElementById(id).textContent =
        parseInt(amount).toLocaleString();
    }

    /* 가격 표시 */
    displayCost('display-amount');
    displayCost('amount-of-payment');
    displayCost('total-cost');

    /* 결제수단 선택 */
    const paymentMethod = document.getElementById('paymentMethod');
    const methodBtn = document.querySelectorAll('input[name="method"]');
    methodBtn.forEach((method) => {
      method.addEventListener('change', function (e) {
        paymentMethod.value = e.target.value;
        document.getElementById('select-method').textContent = e.target.value;
      });
    });
    /* 현금영수증 여부 */
    const cashReceiptsBtn = document.querySelectorAll(
      'input[name="cash-receipt"]'
    );
    cashReceiptsBtn.forEach((radio) => {
      radio.addEventListener('change', function (e) {
        document.getElementById('cashReceipt').value = e.target.value;
      });
    });

    document
      .getElementById('payment-data-send')
      .addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = e.target;
        const cashReceipt = formData.cashReceipt.value;
        const chooseMethod = formData.paymentMethod.value;

        const orderData = {
          amount: parseInt(amount),
          cashReceipts: cashReceipt,
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
