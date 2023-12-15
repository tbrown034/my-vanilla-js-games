import { showSection, hideSection, goBack } from "../script.js";

// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// Global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Rock Paper Scissors";

const gameSubtitle = document.createElement("h3");
gameSubtitle.innerText =
  "Rock Paper Scissors is a hand game usually played between two people, where each player simultaneously forms one of three shapes with an outstretched hand. The possible shapes - rock (a fist), paper (a flat hand), and scissors (a fist with the index and middle fingers extended, forming a V) - have a simple set of rules for which shape defeats which.";

const backButton = document.createElement("button");
backButton.innerText = "Go Back";

const scoreBoard = document.createElement("div");
scoreBoard.id = "rock-scoreboard";

// Main functions
export const loadRock = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  backButton.addEventListener("click", goBack);
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  playNow.addEventListener("click", playRock);
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
};

const playRock = () => {
  gameSection.innerHTML = "";
  const gameBoard = document.createElement("div");
  gameBoard.id = "rock-gameboard";
  gameBoard.innerHTML = `
    <div id="rock-player-choices">
      <h3>Player Choices</h3>
      <button id="player-rock"><i class="fa-solid fa-hand-back-fist"></i> Rock</button>
      <button id="player-paper"><i class="fa-solid fa-hand"></i> Paper</button>
      <button id="player-scissors"><i class="fa-solid fa-hand-scissors fa-flip-horizontal"></i> Scissors</button>
    </div>
    <div id="rock-computer-choices">
      <h3>Computer Choices</h3>
      <div id="computer-rock"><i class="fa-solid fa-hand-back-fist"></i> Rock</div>
      <div id="computer-paper"><i class="fa-solid fa-hand"></i> Paper</div>
      <div id="computer-scissors"><i class="fa-solid fa-hand-scissors"></i> Scissors</div>
    </div>
  `;

  gameSection.append(gameTitle, gameBoard, backButton);

  // Add event listeners to player choices
  document
    .getElementById("player-rock")
    .addEventListener("click", () => playerChoose("rock"));
  document
    .getElementById("player-paper")
    .addEventListener("click", () => playerChoose("paper"));
  document
    .getElementById("player-scissors")
    .addEventListener("click", () => playerChoose("scissors"));
};

const playerChoose = (choice) => {
  console.log("Player chose:", choice);
  computerChoose();
  // Further logic for the game can be added here
};

const computerChoose = () => {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  console.log("Computer chose:", computerChoice);
  // Highlight the computer's choice and handle game result
};
