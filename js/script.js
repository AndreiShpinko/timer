let days, hours, minutes, seconds;

let resetBtn = document.querySelector('[data-info = "reset"]'),
  startStopBtn = document.querySelector('[data-info = "startStop"]'),
  newBtn = document.querySelector('[data-info = "new"]'),
  soundBtn = document.querySelector('[data-info = "sound"]'),
  listenBtn = document.querySelector('[data-info = "listen"]');

let daysEl = document.querySelector(".days");
let hoursEl = document.querySelector(".hours");
let minutesEl = document.querySelector(".minutes");
let secondsEl = document.querySelector(".seconds");

let couthdownEl = document.querySelector(".couthdown");
let couthdownSpanEl = document.querySelector(".couthdown span");

let popupEl = document.querySelector(".popup");
let popupBufferEl = document.querySelector(".popup-buffer");

let inputs = document.querySelectorAll(".timer input");

let counter;
let couthdown;

let audio = new Audio("data/Mariah Carey - All I Want for Christmas Is You.mp3");
soundBtn.onclick = () => {
  if (soundBtn.dataset.status == "stop") {
    soundBtn.dataset.status = "start";
    listenBtn.disabled = false;
} else if (soundBtn.dataset.status == "start") {
    soundBtn.dataset.status = "stop";
    listenBtn.disabled = true;
  }
};

startStopBtn.onclick = () => {
  if (startStopBtn.dataset.status == "start") {
    startStopBtn.dataset.status = "stop";
    startStopBtn.innerHTML = "Stop";
    startCount();
  } else if (startStopBtn.dataset.status == "stop") {
    startStopBtn.dataset.status = "start";
    startStopBtn.innerHTML = "Start";
    days = +daysEl.value;
    hours = +hoursEl.value;
    minutes = +minutesEl.value;
    seconds = +secondsEl.value;
    stopCount();
  }
};

newBtn.onclick = () => {
  if (newBtn.dataset.status == "new") {
    newBtn.dataset.status = "done";
    newBtn.innerHTML = "Done";
    document.querySelectorAll(".timer input").forEach((el) => {
      el.disabled = false;
      el.value = "";
    });
    resetBtn.disabled = true;
    startStopBtn.disabled = true;
    daysEl.focus();
  } else if (newBtn.dataset.status == "done") {
    newBtn.dataset.status = "new";
    newBtn.innerHTML = "New";

    inputs.forEach((el) => {
      if (!el.value) {
        el.value = "00";
      }
    });
    resetBtn.disabled = false;
    startStopBtn.disabled = false;

    inputs.forEach((el) => {
        el.disabled = true;
    });
    days = +daysEl.value;
    hours = +hoursEl.value;
    minutes = +minutesEl.value;
    seconds = +secondsEl.value;
    checkEmptyValues();
  }
};

resetBtn.onclick = () => {
  [days, hours, minutes, seconds] = [0, 0, 0, 0];
  inputs.forEach((el) => {
    el.value = "00";
  });
  startStopBtn.dataset.status = "start";
  startStopBtn.innerHTML = "Start";
  stopCount();
  checkEmptyValues();
};

popupBufferEl.onclick = () => {
  popupBufferEl.classList.remove("active");
  popupEl.classList.remove("active");
  audio.pause();
  audio.currentTime = 0.0;
};

listenBtn.onclick = () => {
  if (listenBtn.dataset.status == "stop") {
    listenBtn.dataset.status = "start";
    let couthdownNum = 11;
    couthdownSpanEl.innerHTML = "Are you ready?";
    couthdownEl.style.opacity = 1;
    couthdownEl.style.visibility = "visible";
    couthdown = setInterval(
      () => {
        audio.play();
        if (+couthdownSpanEl.innerHTML == 0) {
          clearInterval(couthdown);
          couthdown = "";
          couthdownEl.style.opacity = 0;
          couthdownEl.style.visibility = "hidden";
          audio.pause();
          audio.currentTime = 0.0;
          listenBtn.dataset.status = "stop";
        } else {
          couthdownNum--;
          couthdownSpanEl.innerHTML = couthdownNum;
        }
      },
      1000,
      1000
    );
  } else if (listenBtn.dataset.status == "start") {
    listenBtn.dataset.status = "stop";
    couthdown = clearInterval(couthdown);
    couthdownEl.style.opacity = 0;
    couthdownEl.style.visibility = "hidden";
    audio.pause();
    audio.currentTime = 0.0;
  }
};

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    if (inputs[i].value.length == 2 && inputs[i + 1]) {
      inputs[i + 1].focus();
    }
  });
}

// f*******
function checkEmptyValues() {
  let timeCount = 0;
  inputs.forEach((el) => {
    if (el.value == "00") timeCount++;
  });
  if (timeCount == 4) {
    resetBtn.disabled = true;
    startStopBtn.disabled = true;
  }
}

function startCount() {
  counter = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (seconds == 0 && minutes > 0) {
      seconds = 59;
      minutes--;
    } else if (seconds == 0 && minutes == 0 && hours > 0) {
      seconds = 59;
      minutes = 59;
      hours--;
    } else if (seconds == 0 && minutes == 0 && hours == 0 && days > 0) {
      seconds = 59;
      minutes = 59;
      hours = 23;
      days--;
    } else {
      timeOver();
      clearInterval(counter);
    }
    document.querySelector(".days").value = days < 10 ? `0${days}` : days;
    document.querySelector(".hours").value = hours < 10 ? `0${hours}` : hours;
    document.querySelector(".minutes").value =
      minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector(".seconds").value =
      seconds < 10 ? `0${seconds}` : seconds;
  }, 1000);
}

function stopCount() {
  counter = clearInterval(counter);
}

function timeOver() {
  if (soundBtn.dataset.status == "start") {
    audio.play();
  }
  popupBufferEl.classList.add("active");
  popupEl.classList.add("active");
}
