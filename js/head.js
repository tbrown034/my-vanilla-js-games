import { goBack, showSection, hideSection } from "../script.js";
// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");
// game variables
let Heads = 0;
let Tails = 0;
// Global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Heads or Tails";
const gameSubtitle = document.createElement("p");
gameSubtitle.innerText =
  "The game of games. Heads or Tails. Do you have what it takes?";
const backButton = document.createElement("button");
backButton.innerText = "Main Menu";
const scoreBoard = document.createElement("div");
scoreBoard.id = "head-scoreboard";
const gameBoard = document.createElement("div");
gameBoard.id = "head-gameboard";
// Main functions
// Step #1: Create Head or Tails Main Screen
export const loadHead = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const buttonDiv = document.createElement("div");
  buttonDiv.id = "head-button-container";
  buttonDiv.classList.add("button-container");
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  playNow.addEventListener("click", playHead);
  backButton.addEventListener("click", goBack);
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
};
// Step #2: Initialize Game (setting up gameboard, scoreboard, ect) and Wait for Player to Move
const playHead = () => {
  gameSection.innerHTML = "";
  scoreBoard.innerHTML = `
  <h3>ScoreBoard</h3>
  <div id="scoreboard-info">
  <div>Heads: ${Heads}</div>
  <div>Tails: ${Tails}</div>
 </div>`;
  gameBoard.innerHTML = `
  <div id="head-player-choices">
    <h3>Player Choices</h3>
    <div class="button-container">
    <button id="player-heads"><i class="fa-solid fa-head-side"></i>  Heads</button>
    <button id="player-tails"><i class="fa-solid fa-monkey"></i>  Tails</button>
    </div>
  </div>

  </div>
`;
  const turnMessage = document.createElement("div");
  turnMessage.innerHTML = "It is now your turn.";
  gameSection.append(gameTitle, scoreBoard, backButton, turnMessage, gameBoard);
  document
    .getElementById("player-heads")
    .addEventListener("click", () => playerChoice("Heads"));
  document
    .getElementById("player-tails")
    .addEventListener("click", () => playerChoice("Tails"));
};
const playerChoice = (choice) => {
  document.getElementById("player-heads").disabled = true;
  document.getElementById("player-tails").disabled = true;
  console.log("Player selected:", choice);
  const playerChoiceDisplay = document.createElement("p");
  playerChoiceDisplay.innerHTML = `<div><p>You has chosen ${choice}</p></div>`;
  document
    .getElementById("head-player-choices")
    .appendChild(playerChoiceDisplay);
  tallyScore(choice);
  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Play Again";
  playAgainButton.addEventListener("click", playAgain);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  buttonDiv.append(playAgainButton, backButton);
  gameSection.insertBefore(buttonDiv, gameSection.children[2]);
  gameSection.insertBefore(winnerDisplay, gameSection.children[2]);
};

const tallyScore = (choice) => {
  if (choice === "Heads") {
    Heads++;
  } else if (choice === "Tails") {
    // Added else if for safety
    Tails++;
  }
  updateScoreboard();
};

const updateScoreboard = () => {
  scoreBoard.innerHTML = `
    <h3>ScoreBoard</h3>
    <div id="scoreboard-info">
      <div>Heads: ${Heads}</div>
      <div>Tails: ${Tails}</div>
    </div>`;
};

const playAgain = () => {
  gameSection.innerHTML = "";
  playHead();
};
