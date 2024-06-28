// header spot menu rendering
const userInfo = sessionStorage.getItem("userInfo");
const spotMenu = document.querySelector(".spot");
if (!userInfo) {
  // spot
  spotMenu.innerHTML = `
    <li class='login'>
      <a href="./pages/signIn.html">
        <i class="fa-solid fa-right-to-bracket"></i>
        <span>로그인</span>
      </a>
    </li>
    <li class='join'>
      <a href="./pages/signUp.html">
        <i class="fa-solid fa-user-plus"></i>
        <span>회원가입</span>
      </a>
    </li>
  `;
} else {
  // spot
  spotMenu.innerHTML = `
    <li id="logout">
      <i class="fa-solid fa-right-from-bracket"></i>
      <span>로그아웃</span>
    </li>
    <li class='mypage'>
      <a href="./pages/myPage.html">
        <i class="fa-solid fa-user-gear"></i>
        <span>마이페이지</span>
      </a>
    </li>
`;

  document.getElementById("logout").addEventListener("click", function () {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("userInfo");
      alert("로그아웃 되었습니다.");
      window.location.reload();
    }
  });
}

/* 햄버거 메뉴 */
const hamMenu = document.querySelector(".ham-menu");
const navEl = document.querySelector("nav");
hamMenu.addEventListener("click", function () {
  this.classList.toggle("show-menu");
  if (this.classList.contains("show-menu")) {
    navEl.style.display = "flex";
    navEl.style.height = "35px";
    navEl.firstElementChild.style.display = "flex";
  } else {
    navEl.style.height = 0;
    navEl.firstElementChild.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth < 1024) {
    // 모바일 화면일 때
    if (!hamMenu.classList.contains("show-menu")) {
      navEl.style.height = 0;
      navEl.firstElementChild.style.display = "none";
    }
  } else {
    // 데스크탑 화면일 때
    hamMenu.classList.remove("show-menu");
    navEl.style.display = "flex";
    navEl.style.height = 0;
    navEl.firstElementChild.style.display = "flex";
  }
});

// 페이지 로드 시 초기 상태 설정
if (window.innerWidth < 1024) {
  navEl.style.height = 0;
  navEl.firstElementChild.style.display = "none";
} else {
  navEl.style.display = "flex";
  navEl.style.height = 0;
  navEl.firstElementChild.style.display = "flex";
}

// 달력 렌더링
function calendarRendering(display, date) {
  const calendarEl = document.getElementById("calendar");

  let calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "ko",
    initialView: "dayGridMonth",
    googleCalendarApiKey: "AIzaSyDjg0gbj5QCe_pmGqhJcl_510x5i-0C6-U",
    events: {
      googleCalendarId:
        "07602c2e77c6a76840bc6eb4d079f9a4f653c0ba493d1a91469f9b276f437298@group.calendar.google.com",
    },
    // editable: true,
    selectable: true,
    select: function (info) {
      let start = info.startStr;
      let end = info.end;

      date.value = start;
      display.innerHTML = start;

      let now = new Date();
      now.setHours(0, 0, 0, 0);

      let maxDate = new Date();
      maxDate.setMonth(now.getMonth() + 2);

      if (start < now || start > maxDate) {
        alert("최대 2개월 후만 예약이 가능합니다.");
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
      start: "prev",
      center: "title",
      end: "next",
    },
    titleFormat: {
      year: "numeric",
      month: "2-digit",
    },
  });

  calendar.render();
}

// 총 합계 계산 함수 (결제)
function calculateAmount(display, personnel, amount) {
  // 방 옵션 선택
  const timeOption = document.querySelector(".pay-time-btn.selected");

  if (!timeOption) {
    return;
  }

  const timeCost = parseInt(timeOption.dataset.time, 10);

  const additionalPersonAmount = 20000;
  const selectedPersonnel = parseInt(personnel.value, 10);
  const personCost = additionalPersonAmount * selectedPersonnel;

  const totalCost = timeCost + personCost;

  display.innerHTML = totalCost.toLocaleString();
  amount.value = totalCost;
}

// 지도
function mapRendering() {
  var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
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
}

function partyroom(room) {
  console.log(room);
  const gallery = document.querySelector(".party-body");

  let createImgStr = `
      <div class="swiper partyrooms">
        <div class="swiper-wrapper" id="">
          `;

  for (let i = 1; i < 6; i++) {
    createImgStr += `
            <div class="swiper-slide roomimg1">
              <img src="resources/images/partyimg/${room}${i}.jpg" alt="" />
              </div>
              `;
  }
  createImgStr += `
            </div>
            <div class="swiper-pagination"></div>
            </div>
            `;
  gallery.innerHTML = createImgStr;

  var swiper1 = new Swiper(".partyrooms", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
function petroom(room) {
  console.log(room);
  const gallery = document.querySelector(".room-body");

  let createImgStr = `
                      <div class="swiper petroom">
                        <div class="swiper-wrapper" id="">
                    `;

  for (let i = 1; i < 9; i++) {
    createImgStr += `
                    <div class="swiper-slide roomimg">
                      <img src="./resources/images/petroom/${room}${i}.jpg" alt="" />
                    </div>
                    `;
  }
  createImgStr += `
                      </div>
                        <div class="swiper-pagination"></div>
                      </div>
                  `;
  gallery.innerHTML = createImgStr;

  var swiper1 = new Swiper(".petroom", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
// 주소 복사하기
function urlCopy() {
  var copyText = document.getElementById("text");
  copyText.style.display = "block";
  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value).then(
    function () {
      var copyMessage = document.getElementById("copyMessage");
      copyMessage.classList.add("show");
      setTimeout(function () {
        copyMessage.classList.remove("show");
      }, 1000);
    },
    function (err) {
      console.error("Failed to copy: ", err);
    }
  );

  copyText.style.display = "none";
}
