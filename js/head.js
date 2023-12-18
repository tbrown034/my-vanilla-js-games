import { goBack, showSection, hideSection } from "../script.js";

// DOM selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// game variables

let playerWins = 0;
let computerWins = 0;
let ties = 0;

// Global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Rock Paper Scissors";
const gameSubtitle = document.createElement("p");
gameSubtitle.innerText =
  "Rock Paper Scissors is a hand game usually played between two people, where each player simultaneously forms one of three shapes with an outstretched hand.";
const backButton = document.createElement("button");
backButton.innerText = "Main Menu";
const scoreBoard = document.createElement("div");
scoreBoard.id = "rock-scoreboard";
const turnMessage = document.createElement("div");

// Main function to load Heads or Tails game
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

  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, scoreBoard, buttonDiv);
  updateScoreBoard();
};

// Function to start playing Heads or Tails
const playHead = () => {
  gameSection.innerHTML = "";
  const choicesDiv = document.createElement("div");
  choicesDiv.id = "head-player-choices";
  choicesDiv.classList.add("button-container");

  const headsButton = createChoiceButton("Heads");
  const tailsButton = createChoiceButton("Tails");

  choicesDiv.append(headsButton, tailsButton);
  gameSection.append(gameTitle, scoreBoard, backButton, choicesDiv);
};

// Utility functions
const createChoiceButton = (choice) => {
  const button = document.createElement("button");
  button.id = `player-${choice.toLowerCase()}`;
  button.innerText = choice;
  button.addEventListener("click", () => playerChoose(choice));
  return button;
};

const playerChoose = (choice) => {
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  const didWin = choice === result;
  updateScore(didWin);
  displayResult(choice, result, didWin);
};

const updateScore = (didWin) => {
  if (didWin) {
    playerWins++;
  } else {
    computerWins++;
  }
  updateScoreBoard();
};

const displayResult = (guess, result, didWin) => {
  const resultMessage = document.createElement("div");
  resultMessage.innerHTML =
    `You guessed <strong>${guess}</strong>. It was <strong>${result}</strong>. ` +
    (didWin ? "<span>You win!</span>" : "<span>Sorry, you lose.</span>");
  const playAgainButton = createChoiceButton("Play Again");
  playAgainButton.removeEventListener("click", playerChoose);
  playAgainButton.addEventListener("click", playHead);

  gameSection.append(resultMessage, playAgainButton);
};

const updateScoreBoard = () => {
  scoreBoard.innerHTML = `<h3>ScoreBoard</h3>
    <div>Player Wins: ${playerWins}</div>
    <div>Computer Wins: ${computerWins}</div>
    <div>Ties: ${ties}</div>`;
};
