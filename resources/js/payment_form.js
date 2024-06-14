'use strict';

// 날짜 표시
const displayDate = document.getElementById('display-date');

// 합계 표시
const displayTotalAmount = document.getElementById('pay-amount');

// form 전송용 데이터들
const selectedDate = document.getElementById('selected-date');
const selectedRoom = document.getElementById('selected-room');
const selectedTime = document.getElementById('selected-time');
const selectedPersonnel = document.getElementById('selected-personnel');
const calculatedAmount = document.getElementById('total-amount');

// 선택할 옵션들
const selectOptionBtns = document.querySelectorAll('.pay-btn');
const selectTimeBtns = document.querySelectorAll('.pay-time-btn');
const selectRoomBtns = document.querySelectorAll('.pay-room-btn');
const selectPersonnel = document.getElementById('personnel');

// 팝업
const openBtn = document.querySelector('.open-detail');
const closeBtn = document.querySelector('.close-modal');
const modal = document.getElementById('pay-modal');

// calendar
const calendarEl = document.getElementById('calendar');

displayDate.innerHTML = new Date().toISOString().split('T')[0];

let calendar = new FullCalendar.Calendar(calendarEl, {
  locale: 'ko',
  initialView: 'dayGridMonth',
  googleCalendarApiKey: 'AIzaSyDjg0gbj5QCe_pmGqhJcl_510x5i-0C6-U',
  events: {
    googleCalendarId:
      '07602c2e77c6a76840bc6eb4d079f9a4f653c0ba493d1a91469f9b276f437298@group.calendar.google.com',
  },
  // editable: true,
  selectable: true,
  select: function (info) {
    let start = info.startStr;
    let end = info.end;

    selectedDate.value = start;
    displayDate.innerHTML = start;

    let now = new Date();
    now.setHours(0, 0, 0, 0);

    let maxDate = new Date();
    maxDate.setMonth(now.getMonth() + 2);

    if (start < now || start > maxDate) {
      alert('최대 2개월 후만 예약이 가능합니다.');
      calendar.usselect();
    }
  },
  validRange: {
    start: new Date(),
    end: new Date(new Date().setMonth(new Date().getMonth() + 2)),
  },
  dayCellContent: function (e) {
    return { html: e.date.getDate().toString() };
  },
  headerToolbar: {
    start: 'prev',
    center: 'title',
    end: 'next',
  },
  titleFormat: {
    year: 'numeric',
    month: '2-digit',
  },
});

calendar.render();

// 팝업 관련 이벤트
openBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// 선택한 옵션 데이터 저장
function saveOptionData(btns, data) {
  return function () {
    selectOptionBtns.forEach((e) => {
      if (
        btns.classList.contains('pay-time-btn') &&
        e.classList.contains('pay-time-btn')
      ) {
        e.classList.remove('selected');
      } else if (
        btns.classList.contains('pay-room-btn') &&
        e.classList.contains('pay-room-btn')
      ) {
        e.classList.remove('selected');
      }
    });
    this.classList.add('selected');
    data.value = this.value;
    calculateAmount();
  };
}

selectOptionBtns.forEach((btn) => {
  if (btn.classList.contains('pay-time-btn')) {
    btn.addEventListener('click', saveOptionData(btn, selectedTime));
  } else if (btn.classList.contains('pay-room-btn')) {
    btn.addEventListener('click', saveOptionData(btn, selectedRoom));
  }
});

// 인원 선택
selectPersonnel.addEventListener('change', function () {
  selectedPersonnel.value = this.value;
  calculateAmount();
});

// 총 합계 계산 함수
function calculateAmount() {
  // 방 옵션 선택
  const roomOption = document.querySelector('.pay-room-btn.selected');
  const timeOption = document.querySelector('.pay-time-btn.selected');

  if (!roomOption || !timeOption) {
    return;
  }

  const roomCost = parseInt(roomOption.dataset.room, 10);
  const timeCost = parseInt(timeOption.dataset.time, 10);

  console.log(roomCost);
  console.log(timeCost);

  const additionalPersonAmount = 20000;
  const selectedPersonnel = parseInt(selectPersonnel.value, 10) - 4;
  const personCost = additionalPersonAmount * selectedPersonnel;

  const totalCost = roomCost + timeCost + personCost;

  displayTotalAmount.innerHTML = totalCost.toLocaleString();
  calculatedAmount.value = totalCost;
}

// form 전송
document
  .getElementById('payment-transfer')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const room = form.room.value;
    const time = form.time.value;
    const personnel = form.personnel.value;
    const amount = form.amount.value;

    if (!date || !room || !time || !personnel) {
      alert('모든 옵션을 선택해 주세요.');
      return false;
    }

    sessionStorage.setItem('date', date);
    sessionStorage.setItem('time', time);
    sessionStorage.setItem('room', room);
    sessionStorage.setItem('personnel', personnel);
    sessionStorage.setItem('amount', amount);

    // console.log(room);
    window.location.href = '../pages/payment.html';
  });
