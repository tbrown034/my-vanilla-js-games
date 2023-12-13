const introSection = document.getElementById("intro-section");
const gameSection = document.getElementById("game-section");
const ticButton = document.getElementById("tic-button");
const rockButton = document.getElementById("rock-button");
const connectButton = document.getElementById("connect-button");

const startGame = (gameType) => {
  console.log("start game", gameType);
};

// event listeners

ticButton.addEventListener("click", () => startGame("tic"));
rockButton.addEventListener("click", () => startGame("rock"));
connectButton.addEventListener("click", () => startGame("connect"));
