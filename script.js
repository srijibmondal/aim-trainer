const startBtn = document.querySelector("#start");
const advice = document.querySelector("#advice");
const difficultyOptions = document.querySelector(".difficulty");
const restartBtns = document.querySelectorAll(".restart");
const aimSizeOptions = document.querySelector(".aim__size");
const gameBoard = document.querySelector(".game__board");
const increaseAimSizeBtn = document.querySelector("#increase__aim__size");
const decreaseAimSizeBtn = document.querySelector("#decrease__aim__size");
const increaseDifficultyBtn = document.querySelector("#increase__difficulty");
const decreaseDifficultyBtn = document.querySelector("#decrease__difficulty");
const difficultyNumber = document.querySelector("#difficulty__number");
const aimSizeNumber = document.querySelector("#aim__size__number");
const hitsEl = document.querySelector("#hits");
const accuracyEl = document.querySelector("#accuracy");
const lives = document.querySelectorAll(".live");
const gameOverTxt = document.querySelector(".game__over");

let playing = false;
// let aimSize = 3;
let difficulty = 1;
let size = 3;
let hits = 0;
let accuracy = 0;
let missed = 0;

startBtn.addEventListener("click", () => {
  // console.log("hola")
  startBtn.classList.add("dn");
  difficultyOptions.classList.add("dn");
  aimSizeOptions.classList.add("dn");
  advice.classList.add("dn");
  restartBtns[1].classList.remove("dn");
  startGame();
});

function startGame() {
  playing = true;
  createRandomCircle();
}

function createRandomCircle() {
  checkLives();
  if (!playing) {
    console.log("not playing");
  } else {
    const circle = document.createElement("div");
    const { width, height } = gameBoard.getBoundingClientRect();
    const x = getRandomNumber(width);
    const y = getRandomNumber(height);
    circle.classList.add("circle");
    calculateDifficulty();
    calculateAimSize();
    //   circle.style.aspectRatio = "1/1";
    //   circle.style.position = "absolute";
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    //   circle.style.background = "#00c3ff";
    // circle.style.zIndex = "100"
    gameBoard.append(circle);
    //   console.log("circle created");
    //   console.log(x, y);
    //   console.log(circle);
    // console.log(width, height);

    function calculateAimSize() {
      if (size === 1) {
        circle.style.height = "30px";
      } else if (size === 2) {
        circle.style.height = "40px";
      } else if (size === 3) {
        circle.style.height = "50px";
        circle.style.width = "50px";
      } else if (size === 4) {
        circle.style.height = "60px";
      } else if (size === 5) {
        circle.style.height = "70px";
      } else if (size === 6) {
        circle.style.height = "80px";
      }
    }

    function calculateDifficulty() {
      if (difficulty === 1) {
        circle.style.animationDuration = "2s";
      } else if (difficulty === 2) {
        circle.style.animationDuration = "1.5s";
      } else if (difficulty === 3) {
        circle.style.animationDuration = "1s";
      } else {
        circle.style.animationDuration = ".5s";
      }
    }
    function getRandomNumber(e) {
      return Math.round(Math.random() * (e - 100));
    }
    circle.addEventListener("animationend", () => {
      circle.remove();
      decreaseLive();
      createRandomCircle();
    });
    //   circle.addEventListener("click", () => {
    //     console.log("aimed");
    //     circle.remove();
    //     createRandomCircle();
    //     hits++;
    //     hitsEl.innerHTML = hits;
    //   });
  }
}

gameBoard.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    // console.log("clicked")
    e.target.remove();
    createRandomCircle();
    hits++;
    hitsEl.innerHTML = hits;
    calculateAccuracy();
  } else if (!playing || e.target.classList.contains("btn")) {
    return;
  } else {
    missed++;
    calculateAccuracy();
  }
});
function calculateAccuracy() {
  accuracy = (hits / (hits + missed)) * 100;
  accuracy = accuracy.toFixed(2);
  accuracyEl.innerHTML = `${accuracy}%`;
}

decreaseAimSizeBtn.addEventListener("click", () => {
  if (size > 1) {
    size--;
    aimSizeNumber.innerHTML = size;
  } else {
    return;
  }
});

increaseAimSizeBtn.addEventListener("click", () => {
  if (size < 6) {
    size++;
    aimSizeNumber.innerHTML = size;
  } else {
    return;
  }
});
decreaseDifficultyBtn.addEventListener("click", () => {
  if (difficulty > 1) {
    difficulty--;
    difficultyNumber.innerHTML = difficulty;
  }
});
increaseDifficultyBtn.addEventListener("click", () => {
  if (difficulty < 4) {
    difficulty++;
    difficultyNumber.innerHTML = difficulty;
  }
});

function checkLives() {
  if (
    lives[0].classList.contains("dead") &&
    lives[1].classList.contains("dead") &&
    lives[2].classList.contains("dead")
  ) {
    // playing == false;
    finishGame();
    // console.log("game ended");
  } else {
    return;
  }
}

function finishGame() {
  playing = false;
  gameOverTxt.classList.remove("dn");
  restartBtns[0].classList.remove("dn");
  restartBtns[1].classList.add("dn");
}

function decreaseLive() {
  if (
    lives[0].classList.contains("dead") &&
    lives[1].classList.contains("dead") &&
    lives[2].classList.contains("dead")
  ) {
    return;
  } else {
    for (let i = 0; i < lives.length; i++) {
      if (!lives[i].classList.contains("dead")) {
        lives[i].classList.add("dead");
        break;
      }
    }
  }
}

restartBtns.forEach((e) => {
  e.addEventListener("click", () => {
    hits = 0;
    missed = 0;
    accuracy = 0;
    playing = false;
    advice.classList.remove("dn");
    startBtn.classList.remove("dn");
    difficultyOptions.classList.remove("dn");
    aimSizeOptions.classList.remove("dn");
    restartBtns[1].classList.add("dn");
    lives[0].classList.remove("dead");
    lives[1].classList.remove("dead");
    lives[2].classList.remove("dead");
    gameOverTxt.classList.add("dn");
    restartBtns[0].classList.add("dn");
    hitsEl.innerHTML = "0";
    accuracyEl.innerHTML = "0%";
  });
});
