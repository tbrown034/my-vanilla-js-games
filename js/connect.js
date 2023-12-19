import { showSection, hideSection, goBack } from "../script.js";

const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");
// global elements

const backButton = document.createElement("button");
backButton.innerText = "Main Menu";
const turnMessage = document.createElement("div");
const scoreBoard = document.createElement("div");
scoreBoard.id = "connect-scoreboard";
const gameBoard = document.createElement("div");
gameBoard.id = "connect-gameboard";

// game variables

let playerWins = 0;
let computerWins = 0;
let ties = 0;

// main functions
//Loads Game Screen
export const loadConnect = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const gameTitle = document.createElement("h1");
  gameTitle.innerText = "Connect Four";
  const gameSubtitle = document.createElement("h3");
  gameSubtitle.innerText =
    "Connect Four is a two-player connection game in which the players first choose a color and then take turns dropping colored discs into a seven-column, six-row vertically suspended grid. The objective is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs.";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  backButton.addEventListener("click", goBack);
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  playNow.addEventListener("click", playConnect);
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
  console.log("here at connect");
};

//Start Game

const playConnect = () => {
  gameSection.innerHTML = "";
  scoreBoard.innerHTML = `    <h3>ScoreBoard</h3>
  <div id="scoreboard-info">
    <div>Player Wins: ${playerWins}</div>
    <div>Computer Wins: ${computerWins}</div>
    <div>Ties: ${ties}</div>
  </div>`;
  for (let r = 0; r < 7; r++) {
    const row = document.createElement("div");
    row.classList.add("game-row");
    for (let c = 0; c < 6; c++) {
      const cell = document.createElement("div");
      cell.classList.add("connect-cell");
      cell.id = `cell-${r}-${c}`; // ID for each cell
      row.append(cell);
    }
    gameBoard.append(row);
  }
  turnMessage.innerHTML = "It is now your turn.";
  gameSection.append(scoreBoard, backButton, turnMessage, gameBoard);
};
