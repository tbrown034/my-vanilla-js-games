import { showSection, hideSection, goBack } from "../script.js";
// dom selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");
// global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Tic Tac Toe";
const gameSubtitle = document.createElement("p");
gameSubtitle.innerText =
  "Tic Tac Toe is a simple two-player game where players alternate marking spaces in a 3x3 grid with their respective symbols. The winner is the first player to place three of their marks in a horizontal, vertical or diagonal row.";
const backButton = document.createElement("button");
backButton.innerText = "Main Menu";
const displayTurn = document.createElement("div");
const scoreBoard = document.createElement("div");
scoreBoard.id = "tic-scoreboard";

// game variables

let playerWins = 0;
let computerWins = 0;
let ties = 0;
let playerTurn = true;
let currentPlayer = "Your";

// helper functions
const indicateTurn = () => {
  currentPlayer = playerTurn ? "your" : "the computer's";
  displayTurn.innerHTML = `<p>It is now ${currentPlayer} turn.</p>`;
};

const stopGame = (result) => {
  setTimeout;
  // Disable further moves
  const cells = document.querySelectorAll(".cells");
  cells.forEach((cell) => {
    cell.removeEventListener("click", makeMove);
    cell.id = "game-over-cells";
  });

  // Determine and display the message
  let message = "";
  if (result === "player") {
    message = "Congrats, you won! The X's defeated the O's.";
    playerWins++;
  } else if (result === "computer") {
    message = "Sorry, you lost. The O's defeated the X's.";
    computerWins++;
  } else if (result === "tie") {
    message = "It's a tie!";
    ties++;
  }

  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.id = "winner-display"; // Add an ID or class for styling if needed
  scoreBoard.insertAdjacentElement("afterend", messageDiv); // Insert the message right after the scoreboard

  updateScoreboard(); // Update the scoreboard
};
const checkWinner = () => {
  const cells = document.querySelectorAll(".cells");
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
    const [a, b, c] = winningCombos[i];
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      const winner = cells[a].innerText === "X" ? "player" : "computer";
      stopGame(winner); // Pass the winner to stopGame
      return true;
    }
  }
  // Check for a tie
  const isTie = [...cells].every((cell) => cell.innerText !== "");
  if (isTie) {
    stopGame("tie"); // Indicate a tie
    ties++;
    updateScoreboard();
    return true;
  }

  return false; // No winner yet
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

const computerTurn = () => {
  const cells = document.querySelectorAll(".cells");
  const emptyCells = Array.from(cells).filter((cell) => cell.innerText === "");
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].innerText = "O";
    playerTurn = true;
    checkWinner();
    indicateTurn();
  }
};

// main functions
export const loadTic = () => {
  gameSection.innerHTML = "";
  gameSection.classList.add("center-section");
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
};

const makeMove = (event) => {
  gameSection.classList.remove();
  let selectedCell = event.target;
  if (playerTurn && selectedCell.innerText === "") {
    selectedCell.innerText = "X";
    playerTurn = false;
    const gameEnded = checkWinner(); // Check if the game has ended
    if (!gameEnded) {
      indicateTurn();
      setTimeout(computerTurn, 500); // Proceed to computer's turn only if game hasn't ended
    }
  }
};

const playTic = () => {
  gameSection.classList.remove("center-selection");

  playerTurn = true; // Ensure the game starts with the player's turn
  currentPlayer = "Your"; // Reset the current player display
  indicateTurn(); // Update turn display
  gameSection.innerHTML = "";
  const gameBoard = document.createElement("div");
  gameBoard.id = "tic-gameboard";
  indicateTurn();
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.dataset.index = i;
    cell.innerHTML = "";
    gameBoard.append(cell);
    cell.addEventListener("click", makeMove);
  }
  scoreBoard.innerHTML = `
  <h3>ScoreBoard</h3>
  <div id="scoreboard-info">
  <div>Player Wins: ${playerWins}</div>
  <div>Computer Wins: ${computerWins}</div>
  <div>Ties: ${ties}</div></div>`;
  const clearButton = document.createElement("button");
  clearButton.innerText = "Play Again";
  clearButton.addEventListener("click", () => {
    playTic();
  });
  const newButtonDiv = document.createElement("div");
  newButtonDiv.append(backButton, clearButton);
  newButtonDiv.classList.add("button-container");
  gameSection.append(
    gameTitle,
    scoreBoard,
    newButtonDiv,
    displayTurn,
    gameBoard
  );
};
