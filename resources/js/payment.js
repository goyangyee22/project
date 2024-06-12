const date = sessionStorage.getItem("date");
const time = sessionStorage.getItem("time");
const personnel = sessionStorage.getItem("personnel");

document.getElementById("display-date").textContent = date;
document.getElementById("display-time").textContent = time;
document.getElementById("display-personnel").textContent = personnel;

document.getElementById("payment").addEventListener("submit", function (e) {
  e.preventDefault();

  const cardNum1 = document.getElementById("card-number1").value;
  const cardNum2 = document.getElementById("card-number2").value;
  const cardNum3 = document.getElementById("card-number3").value;
  const cardNum4 = document.getElementById("card-number4").value;

  const cardNumber = cardNum1 + cardNum2 + cardNum3 + cardNum4;

  // test
  if (SubmitEvent) {
    console.log({
      date: date,
      time: time,
      personnel: personnel,
      cardNumber: cardNumber,
    });
    sessionStorage.clear();
    window.location.href = "mypage.html";
  } else {
    console.log("저장 실패");
  }

  // 데이터베이스 저장
  // 데이터 전송 후 마이페이지로 이동해 결제 내역이 표시되게끔 한다.
});
