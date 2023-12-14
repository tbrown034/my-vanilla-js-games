import { showSection, hideSection, goBack } from "../script.js";
// dom selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");
const gameTitle = document.createElement("h1");
// global elements
gameTitle.innerText = "Tic Tac Toe";
const gameSubtitle = document.createElement("h3");
gameSubtitle.innerText =
  "Tic Tac Toe is a simple two-player game where players alternate marking spaces in a 3x3 grid with their respective symbols (commonly X and O). The winner is the first player to place three of their marks in a horizontal, vertical, or diagonal row.";
const backButton = document.createElement("button");
backButton.innerText = "Go Back";
// game variables

let playerWins = 0;
let computerWins = 0;
let ties = 0;
let playerTurn = true;
let currentPlayer = "Your";

const checkWinner = () => {
  const cells = document.querySelectorAll(".cells");

  // Define winning combinations as sets of indices
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    const a = combo[0],
      b = combo[1],
      c = combo[2];

    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      console.log("Winner: " + cells[a].innerText);
      return cells[a].innerText; // 'X' or 'O'
    }
  }

  return null; // No winner
};

// main functions

export const loadTic = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  backButton.addEventListener("click", goBack);
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  playNow.addEventListener("click", playTic);
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
  // playTic();
};

const makeMove = (event) => {
  let selectedCell = event.target;
  if (playerTurn && selectedCell.innerText === "") {
    selectedCell.innerText = "X";
    playerTurn = false;
    checkWinner();
  }
  setTimeout(computerTurn, 500); // Delay the computer turn for better user experience
};

const computerTurn = () => {
  const cells = document.querySelectorAll(".cells");
  const emptyCells = Array.from(cells).filter((cell) => cell.innerText === "");

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].innerText = "O";
    playerTurn = true; // Switch back to player turn
    checkWinner();
  }
};

const playTic = () => {
  gameSection.innerHTML = "";
  const gameBoard = document.createElement("div");
  gameBoard.id = "tic-gameboard";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.dataset.index = i;
    gameBoard.append(cell);
    cell.addEventListener("click", makeMove);
  }
  const scoreBoard = document.createElement("div");
  scoreBoard.id = "tic-scoreboard";
  scoreBoard.innerHTML = `
  <h3>ScoreBoard</h3>
  <div>Player Wins: ${playerWins}</div>
  <div>Computer Wins: ${computerWins}</div>
  <div>Ties: ${ties}</div>`;
  const displayTurn = document.createElement("div");
  displayTurn.innerHTML = `<p>It is now ${currentPlayer} turn.</p>`;

  gameSection.append(gameTitle, scoreBoard, displayTurn, gameBoard, backButton);
};
