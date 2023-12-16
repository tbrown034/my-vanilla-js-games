import { showSection, hideSection, goBack } from "../script.js";

// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// Global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Rock Paper Scissors";

const gameSubtitle = document.createElement("p");
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
      <p>Make Your Selection</p>
      <div class="button-container">

      <button id="player-rock"><i class="fa-solid fa-hand-back-fist"></i> Rock</button>
      <button id="player-paper"><i class="fa-solid fa-hand"></i> Paper</button>
      <button id="player-scissors"><i class="fa-solid fa-hand-scissors fa-flip-horizontal"></i> Scissors</button>
      </div>
    </div>
    <div id="rock-computer-choices">
      <h3>Computer Choices</h3>
      <div class="button-container">

      <div id="computer-rock"><i class="fa-solid fa-hand-back-fist"></i> Rock</div>
      <div id="computer-paper"><i class="fa-solid fa-hand"></i> Paper</div>
      <div id="computer-scissors"><i class="fa-solid fa-hand-scissors"></i> Scissors</div>
      </div>
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
  const playerChoiceDisplay = document.createElement("p");
  playerChoiceDisplay.innerHTML = `You Have Chosen ${choice}`;
  document
    .getElementById("rock-player-choices")
    .appendChild(playerChoiceDisplay);
  computerChoose();
  // Further logic for the game can be added here
};

const computerChoose = () => {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const computerChoiceDisplay = document.createElement("p");
  computerChoiceDisplay.innerHTML = `The Computer has Chosen ${computerChoice}`;
  document
    .getElementById("rock-computer-choices")
    .appendChild(computerChoiceDisplay);
  console.log("Computer chose:", computerChoice);
  decideWinner();
  // Highlight the computer's choice and handle game result
};

const decideWinner = () => {
  const playerChoice = document
    .getElementById("rock-player-choices")
    .lastChild.innerHTML.split(" ")[3];
  const computerChoice = document
    .getElementById("rock-computer-choices")
    .lastChild.innerHTML.split(" ")[4];

  if (playerChoice === computerChoice) {
    displayWinner("It's a tie!");
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  ) {
    displayWinner("Player wins!");
  } else {
    displayWinner("Computer wins!");
  }
};

const displayWinner = (winner) => {
  const winnerDisplay = document.createElement("p");
  winnerDisplay.innerHTML = winner;
  document.getElementById("rock-gameboard").appendChild(winnerDisplay);
};
