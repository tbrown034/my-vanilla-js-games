import { showSection, hideSection, goBack } from "../script.js";

// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// Global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Rock Paper Scissors";
const gameSubtitle = document.createElement("p");
gameSubtitle.innerText =
  "Rock Paper Scissors is a hand game usually played between two people, where each player simultaneously forms one of three shapes with an outstretched hand.";
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
  buttonDiv.id = "rps-button-container";
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
    .addEventListener("click", () => playerChoose("Rock"));
  document
    .getElementById("player-paper")
    .addEventListener("click", () => playerChoose("Paper"));
  document
    .getElementById("player-scissors")
    .addEventListener("click", () => playerChoose("Scissors"));
};

const getIconHTML = (choice) => {
  switch (choice) {
    case "Rock":
      return '<i class="fa-solid fa-hand-back-fist"></i>';
    case "Paper":
      return '<i class="fa-solid fa-hand"></i>';
    case "Scissors":
      return '<i class="fa-solid fa-hand-scissors"></i>';
    default:
      return "";
  }
};

const playerChoose = (choice) => {
  document.getElementById("player-rock").disabled = true;
  document.getElementById("player-paper").disabled = true;
  document.getElementById("player-scissors").disabled = true;
  console.log("Player chose:", choice);
  const playerChoiceDisplay = document.createElement("p");
  playerChoiceDisplay.innerHTML = `<div><p>You has chosen ${choice}</p> <div> ${getIconHTML(
    choice
  )}</div></div>`;
  document
    .getElementById("rock-player-choices")
    .appendChild(playerChoiceDisplay);
  computerChoose();
  // Further logic for the game can be added here
};

const computerChoose = () => {
  setTimeout(() => {
    // Start of the function to delay
    const choices = ["Rock", "Paper", "Scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const computerChoiceDisplay = document.createElement("p");
    computerChoiceDisplay.innerHTML = `<div><p>The Computer has chosen ${computerChoice}</p> <div>${getIconHTML(
      computerChoice
    )}</div></div>`;
    document
      .getElementById("rock-computer-choices")
      .appendChild(computerChoiceDisplay);
    console.log("Computer chose:", computerChoice);
    decideWinner(); // Make sure to pass necessary arguments if required
  }, 2000); // End of the function to delay and the delay time
};

const decideWinner = () => {
  const playerChoice = document
    .getElementById("rock-player-choices")
    .lastChild.textContent.trim()
    .split(" ")[3];
  const computerChoice = document
    .getElementById("rock-computer-choices")
    .lastChild.textContent.trim()
    .split(" ")[4];

  let resultMessage;

  if (playerChoice === computerChoice) {
    resultMessage = "It's a tie!";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Scissors" && computerChoice === "Paper") ||
    (playerChoice === "Paper" && computerChoice === "Rock")
  ) {
    resultMessage = `Player Wins! ${playerChoice} defeats ${computerChoice}.`;
  } else {
    resultMessage = `Computer Wins! ${computerChoice} defeats ${playerChoice}.`;
  }

  displayWinner(resultMessage);
};

const displayWinner = (message) => {
  setTimeout(() => {
    const winnerDisplay = document.createElement("div");
    winnerDisplay.innerHTML = message;
    winnerDisplay.id = "winner-display";
    const playAgainButton = document.createElement("button");
    playAgainButton.innerText = "Play Again";
    playAgainButton.addEventListener("click", playAgain);
    backButton.addEventListener("click", goBack);
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-container");
    buttonDiv.append(playAgainButton, backButton);
    gameSection.insertBefore(buttonDiv, gameSection.children[1]);
    gameSection.insertBefore(winnerDisplay, gameSection.children[1]);
  }, 2000);
};

const playAgain = () => {
  gameSection.innerHTML = "";
  playRock();
};
