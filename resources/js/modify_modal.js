document.addEventListener("DOMContentLoaded", function () {
  const modifyBtn = document.getElementById("modifyBtn");
  const closeModal = document.querySelector(".close");
  const modal = document.getElementById("myModal");

  modifyBtn.addEventListener("click", function () {
    // 모달 열기
    modal.style.display = "block";

    // 선택된 행의 데이터를 가져와서 수정 폼에 채움
    const selectedTr = document.querySelector(".selected");
    if (selectedTr) {
      const name = selectedTr.querySelector(".name").textContent;
      const title = selectedTr.querySelector(".title").textContent;
      const content = selectedTr.querySelector(".content").textContent;
      const date = selectedTr.querySelector(".date").textContent;

      const modifyForm = document.getElementById("modifyForm");
      modifyForm.querySelector("input[name='modifyTitle']").value = title;
      modifyForm.querySelector("input[name='modifyContent']").value = content;
    } else {
      alert("수정할 게시글을 선택해주세요.");
      modal.style.display = "none"; // 모달 닫기
    }
  });

  // 모달 닫기 버튼에 이벤트 리스너 추가
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // 모달 바깥 클릭 시 모달 닫기
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // 수정 완료 버튼에 대한 이벤트 리스너 추가
  const modifyForm = document.getElementById("modifyForm");
  modifyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 수정 폼에서 입력된 값 가져오기
    const modifyTitle = modifyForm.querySelector(
      "input[name='modifyTitle']"
    ).value;
    const modifyContent = modifyForm.querySelector(
      "input[name='modifyContent']"
    ).value;

    // 수정이 완료되면 모달 닫기
    modal.style.display = "none";
  });
});
