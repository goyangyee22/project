"use strict";

document
  .getElementById("detail-payment")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const time = form.time.value;
    const personnel = form.personnel.value;

    sessionStorage.setItem("date", date);
    sessionStorage.setItem("time", time);
    sessionStorage.setItem("personnel", personnel);

    window.location.href = "payment.html";
  });
