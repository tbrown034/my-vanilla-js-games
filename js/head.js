import { goBack, showSection, hideSection } from "../script.js";

// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// Game variables
let playerWins = 0;
let computerWins = 0;
let ties = 0;

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
const displayMessage = document.createElement("div");
displayMessage.classList.add("turn-message");

// Main functions
// Step #1: Create Head or Tails Main Screen
export const loadHead = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo-div");

  const gameImage = document.createElement("img");
  gameImage.src = "assets/photos/vanilla-heads.png"; // Set the source to the image path
  gameImage.alt = "Description of the image"; // Always good to have an alt text
  photoDiv.appendChild(gameImage);

  const buttonDiv = document.createElement("div");
  buttonDiv.id = "head-button-container";
  buttonDiv.classList.add("button-container");
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  playNow.addEventListener("click", playHead);
  backButton.addEventListener("click", goBack);
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv, photoDiv);
};

// Step #2: Initialize Game
const playHead = () => {
  gameSection.innerHTML = "";
  updateScoreboard();
  gameBoard.innerHTML = `
    <div id="head-player-choices">
      <h3>Player Choices</h3>
      <div class="button-container">
        <button id="player-heads"><i class="fa-solid fa-head-side"></i>    Heads</button>
        <button id="player-tails"><i class="fa-solid fa-monkey"></i>  Tails</button>
      </div>
    </div>
    <div id="head-computer-choices">
    <h3>Computer Choices</h3>
    <div class="button-container">
    <div class="computer-icons"><i class="fa-solid fa-head-side"></i>    Heads</div>
    <div class="computer-icons"><i class="fa-solid fa-monkey"></i>  Tails</</div>
    </div>
  </div>
    `;

  displayMessage.innerHTML = "It is now your turn.";
  gameSection.append(
    gameTitle,
    scoreBoard,
    backButton,
    displayMessage,
    gameBoard
  );
  document
    .getElementById("player-heads")
    .addEventListener("click", () => playerChoice("Heads"));
  document
    .getElementById("player-tails")
    .addEventListener("click", () => playerChoice("Tails"));
};

const playerChoice = (playerGuess) => {
  const computerGuess = Math.random() < 0.5 ? "Heads" : "Tails";
  const coinFlipResult = Math.random() < 0.5 ? "Heads" : "Tails";
  const choicesDisplay = document.createElement("div");
  choicesDisplay.id = "choice-display";
  displayMessage.innerHTML = "";
  choicesDisplay.innerHTML = `
    <p>Your choice: ${playerGuess}</p>
    <p>Computer's choice: ${computerGuess}</p>
    <p>Coin flip result: ${coinFlipResult}</p>`;

  if (playerGuess === coinFlipResult && computerGuess !== coinFlipResult) {
    playerWins++;
    displayMessage.innerText = "You win!";
  } else if (
    playerGuess !== coinFlipResult &&
    computerGuess === coinFlipResult
  ) {
    computerWins++;
    displayMessage.innerText = "Computer wins!";
  } else {
    ties++;
    displayMessage.innerText = "It's a tie!";
  }

  updateScoreboard();
  const playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Play Again";
  playAgainButton.addEventListener("click", playAgain);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  buttonDiv.append(playAgainButton, backButton);
  gameSection.insertBefore(buttonDiv, gameSection.children[2]);
  gameSection.insertBefore(displayMessage, gameSection.children[2]);
  gameSection.insertBefore(choicesDisplay, gameSection.children[2]);
};

const updateScoreboard = () => {
  scoreBoard.innerHTML = `
    <h3>ScoreBoard</h3>
    <div id="scoreboard-info">
      <div>Player Wins: ${playerWins}</div>
      <div>Computer Wins: ${computerWins}</div>
      <div>Ties: ${ties}</div>
    </div>`;
};

const playAgain = () => {
  gameSection.innerHTML = "";
  playHead();
};
