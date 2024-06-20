const paymentData = {
  party1: {
    title: "파티룸1",
    desc: "설명",
    standardPeople: 4,
    maximumPeople: 8,
    cost: {
      day: 60000,
      night: 80000,
      all: 100000,
    },
    hash: ["해시태그1", "해시태그2", "해시태그3"],
  },
  party2: {
    title: "파티룸2",
    desc: "설명",
    standardPeople: 4,
    maximumPeople: 8,
    cost: {
      day: 60000,
      night: 80000,
      all: 100000,
    },
    hash: ["해시태그1", "해시태그2", "해시태그3"],
  },
  party3: {
    title: "파티룸3",
    desc: "설명",
    standardPeople: 4,
    maximumPeople: 8,
    cost: {
      day: 60000,
      night: 80000,
      all: 100000,
    },
    hash: ["해시태그1", "해시태그2", "해시태그3"],
  },
  meeting1: {
    title: "소회의실",
    desc: "✨고객인증✨ 쾌적한 환경에서 모임이 가능한 곳!!<br/>🎀각종 모임 대환영🎀 블로그 리뷰 인증 시 2시간 추가 제공(●'◡'●)🧡🎁",
    standardPeople: 4, //기준인원
    maximumPeople: 8, // 최대인원
    cost: {
      //가격
      day: 60000,
      night: 80000,
      all: 100000,
    },
    hash: ["화상면접", "스터디", "원데이클래스"],
  },
  meeting2: {
    title: "중회의실",
    desc: "✨고객인증✨ 눈과 맘이 편안한 빌리슈만의 친환경 인테리어 제공👏👏 블로그 리뷰 인증 시 2시간 추가 제공^o^🧡🎁",
    standardPeople: 6,
    maximumPeople: 17,
    cost: {
      day: 80000,
      night: 100000,
      all: 120000,
    },
    hash: ["모임공간", "쾌적한", "풀옵션", "단체룸"],
  },
  meeting3: {
    title: "대회의실",
    desc: "✨고객인증✨ 풀옵션 완비❗ 커피맛집☕ 🎀단체 대환영🎀 블로그 리뷰 인증 시 2시간 추가 제공(●'◡'●)🧡🎁",
    standardPeople: 15,
    maximumPeople: 32,
    cost: {
      day: 100000,
      night: 120000,
      all: 140000,
    },
    hash: ["대규모", "교육장", "워크숍", "기업행사"],
  },
  petroom1: {
    title: "펫룸 스위트",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, saepe necessitatibus aut harum impedit beatae minima ut! Nisi laboriosam, dolorum iure repudiandae natus harum eos vitae commodi optio ut quasi?",
    standardPeople: 2,
    maximumPeople: 4,
    cost: {
      day: 40000,
      night: 50000,
      all: 90000,
    },
    hash: ["쾌적한", "편안함", "반려견과 힐링", "좋은추억"],
  },
  petroom2: {
    title: "펫룸 디럭스",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, saepe necessitatibus aut harum impedit beatae minima ut! Nisi laboriosam, dolorum iure repudiandae natus harum eos vitae commodi optio ut quasi?",
    standardPeople: 6,
    maximumPeople: 8,
    cost: {
      day: 80000,
      night: 90000,
      all: 130000,
    },
    hash: ["쾌적한", "편안함", "반려견과 힐링", "좋은추억"],
  },
  petroom3: {
    title: "펫룸 패밀리",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, saepe necessitatibus aut harum impedit beatae minima ut! Nisi laboriosam, dolorum iure repudiandae natus harum eos vitae commodi optio ut quasi?",
    standardPeople: 6,
    maximumPeople: 8,
    cost: {
      day: 110000,
      night: 120000,
      all: 160000,
    },
    hash: ["쾌적한", "편안함", "반려견과 힐링", "좋은추억"],
  },
};

function openPayment(content) {
  const data = paymentData[content];
  const { standardPeople, maximumPeople, hash } = data;
  const difference = maximumPeople - standardPeople;

  const selectPeople = Array.from({ length: difference + 1 }, (_, i) => i);

  const options = selectPeople.map(
    (e) => `<option value='${e}'>${e}명</option>`
  );

  const keywords = hash
    .map((e) => {
      return `<span class="hash-item">#${e}</span>`;
    })
    .join("");

  if (data) {
    document.querySelector(".modal-body").innerHTML = `
      <div id="detail-payment">
        <div class="pay-info">
          <div class="pay-header">
            <h3 id="room-name">${data.title}</h3>
            <div class="pay-desc">
              <p>
                ${data.desc}
              </p>
              <!-- 해시태그 아이콘 -->
              <div class="pay-hash">
                ${keywords}
              </div>
            </div>
          </div>
          <!-- 예약 시 주의사항 -->
          <div class="pay-caution">
            <h4>예약 전 반드시 확인하세요!</h4>
            <div class="caution-desc">
              <h5>
                <i class="fa-solid fa-thumbtack"></i>시간당 예약은 문의해 주세요.
              </h5>
              <a href="./pages/QnA.html">-> 문의 게시판 바로가기</a>
            </div>
            <div class="caution-desc">
              <h5>
                <i class="fa-solid fa-thumbtack"></i>보증금 제도를 운영합니다.
              </h5>
              <p>
                무인으로 운영하는 파티룸의 특성상 보증금 제도를 운영하고
                있습니다.<br />
                예약 후 보증금(5만원) 관련 안내 문자를 보내드리며 퇴실 후 문제가
                없는 경우 최대 48시간 이내에 100% 환불해 드립니다.
              </p>
            </div>
          </div>
        </div>
        <!-- 결제 옵션 시작 -->
        <div class="pay-options">
          <!-- 날짜 선택 -->
          <div class="pay-option">
            <p class="pay-title">
              <i class="fa-solid fa-check"></i>
              날짜를 선택해 주세요.
            </p>
            <div id="calendar"></div>
            <span id="display-date"></span>
          </div>
          <!-- 시간 선택 -->
          <div class="pay-option">
            <p for="pay-time" class="pay-title">
              <i class="fa-solid fa-check"></i>
              시간을 선택해 주세요.
            </p>
            <div class="pay-btn-wrap">
              <!-- 
                ** 시간당 가격 작성법
                data-time="가격"
                value="시간 옵션(낮,밤,종일 등등)"
              -->
              <input
                class="pay-btn pay-time-btn"
                type="button"
                data-time="${data.cost.day}"
                value="오전"
              />
              <input
                class="pay-btn pay-time-btn"
                type="button"
                data-time="${data.cost.night}"
                value="오후"
              />
              <input
                class="pay-btn pay-time-btn"
                type="button"
                data-time="${data.cost.all}"
                value="종일"
              />
            </div>
          </div>
          <!-- 추가 인원 선택 -->
          <div class="pay-option">
            <p for="personnel" class="pay-title">
              <i class="fa-solid fa-check"></i>
              추가 인원을 선택해 주세요.
            </p>
            <div class="select-personnel">
              <div class="personnel-desc">
                <span
                  >· 기준인원 ${data.standardPeople}명, 최대인원
                  ${data.maximumPeople}명</span
                >
                <span>· 추가인원 1명당 20000원 증가</span>
              </div>
              <select name="personnel" id="personnel">
                ${options}
              </select>
            </div>
          </div>
        </div>
        <!-- 결제폼 푸터 시작 -->
        <div class="pay-footer">
          <div class="pay-total">
            <h4>총 합계</h4>
            <p><span id="pay-amount">0</span>원</p>
          </div>
          <form id="payment-transfer">
            <input type="hidden" name="date" id="selected-date" required />
            <input type="hidden" name="time" id="selected-time" required />
            <input
              type="hidden"
              name="personnel"
              id="selected-personnel"
              required
            />
            <input type="hidden" name="amount" id="total-amount" required />
            <input
              type="button"
              class="form-btn"
              onclick="location.href='./pages/QnA.html'"
              value="문의하기"
            />
            <input type="submit" class="submit-btn form-btn" value="결제하기" />
          </form>
        </div>
      </div>
      `;

    // 날짜 표시
    const displayDate = document.getElementById("display-date");

    // 합계 표시
    const displayTotalAmount = document.getElementById("pay-amount");

    // form 전송용 데이터들
    const selectedDate = document.getElementById("selected-date");
    const selectedTime = document.getElementById("selected-time");
    const selectedPersonnel = document.getElementById("selected-personnel");
    const calculatedAmount = document.getElementById("total-amount");

    // 선택할 옵션들
    const selectOptionBtns = document.querySelectorAll(".pay-btn");
    const selectTimeBtns = document.querySelectorAll(".pay-time-btn");
    const selectPersonnel = document.getElementById("personnel");

    // 선택한 옵션 데이터 저장

    function saveOptionData(btns, data) {
      return function () {
        selectOptionBtns.forEach((e) => {
          if (
            btns.classList.contains("pay-time-btn") &&
            e.classList.contains("pay-time-btn")
          ) {
            e.classList.remove("selected");
          }
        });
        this.classList.add("selected");
        data.value = this.value;
        calculateAmount(displayTotalAmount, selectPersonnel, calculatedAmount);
      };
    }

    selectOptionBtns.forEach((btn) => {
      if (btn.classList.contains("pay-time-btn")) {
        btn.addEventListener("click", saveOptionData(btn, selectedTime));
      }
    });

    // 인원 선택
    selectPersonnel.addEventListener("change", function () {
      selectedPersonnel.value = this.value;
      calculateAmount(displayTotalAmount, selectPersonnel, calculatedAmount);
    });

    displayDate.innerHTML = new Date().toISOString().split("T")[0];
    calendarRendering(displayDate, selectedDate);

    // form 전송
    document
      .getElementById("payment-transfer")
      .addEventListener("submit", function (e) {
        e.preventDefault();

        const form = e.target;
        const date = form.date.value;
        const time = form.time.value;
        const personnel = parseInt(form.personnel.value) + standardPeople;
        const amount = form.amount.value;

        if (!date || !time || !personnel) {
          alert("모든 옵션을 선택해 주세요.");
          return false;
        }

        sessionStorage.setItem("date", date);
        sessionStorage.setItem("time", time);
        sessionStorage.setItem("personnel", personnel);
        sessionStorage.setItem("amount", amount);

        window.location.href = "./pages/payment.html";
      });
  }
}
