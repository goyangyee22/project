import { getDatas, addDatas } from "../../firebase.js";

const rBox = document.querySelector(".rbox");

async function getBoard() {
  try {
    const snapshot = await getDatas("board");

    let boardArr = [];
    for (let i = 0; i < 3; i++) {
      boardArr.push(snapshot.docs[i].data());
    }

    console.log(boardArr);

    if (boardArr) {
      boardArr.forEach((el) => {
        const { content, name, title, date } = el;
        rBox.insertAdjacentHTML(
          "beforeend",
          `
            <div class="ra_box">
    <span class="ricon"
      ><i class="fa-solid fa-circle-user"></i>
    </span>
    <div class="ra_text">
      <div class="review-contents">
        <strong class="review-user-name">${name}</strong>
        <div class="star-wrap">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
      </div>
      <p class="ra_review">
       ${content}
      </p>
      <img
        class=""
        src="./resources/images/meeting/후기 사진1.jpeg"
        width="100"
        height="100"
      />
      <img
        class=""
        src="./resources/images/meeting/후기 사진2.jpg"
        width="100"
        height="100"
      />
      <div class="date">${date}</div>
    </div>
    <br />
  </div>
            `
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
}

getBoard();
