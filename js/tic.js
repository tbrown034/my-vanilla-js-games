import { showSection, hideSection, goBack } from "../script.js";
// dom selectors
const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");
// global elements
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Tic Tac Toe";
const gameSubtitle = document.createElement("h3");
gameSubtitle.innerText =
  "Tic Tac Toe is a simple two-player game where players alternate marking spaces in a 3x3 grid with their respective symbols (commonly X and O). The winner is the first player to place three of their marks in a horizontal, vertical, or diagonal row.";
const backButton = document.createElement("button");
backButton.innerText = "Go Back";
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

const stopGame = (message) => {
  // Disable further moves
  const cells = document.querySelectorAll(".cells");
  cells.forEach((cell) => {
    cell.removeEventListener("click", makeMove);
    cell.id = "game-over-cells";
  });

  // Display a message (if provided)
  if (message) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    gameSection.appendChild(messageDiv);
  }
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
      console.log("Winner: " + cells[a].innerText);
      stopGame("Winner: " + cells[a].innerText); // Stop the game and display winner
      if (cells[a].innerText === "X") {
        playerWins++;
        updateScoreboard();
      } else {
        computerWins++;
        updateScoreboard();
      }

      return true;
    }
  }
  // Check for a tie
  const isTie = [...cells].every((cell) => cell.innerText !== "");
  if (isTie) {
    stopGame("It's a tie!"); // Stop the game in case of a tie
    ties++;
    updateScoreboard();
    return true;
  }

  return false; // No winner yet
};

const updateScoreboard = () => {
  scoreBoard.innerHTML = `
    <h3>ScoreBoard</h3>
    <div>
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
  let selectedCell = event.target;
  if (playerTurn && selectedCell.innerText === "") {
    selectedCell.innerText = "X";
    playerTurn = false;
    const gameEnded = checkWinner(); // Check if the game has ended
    if (!gameEnded) {
      indicateTurn();
      setTimeout(computerTurn, 2000); // Proceed to computer's turn only if game hasn't ended
    }
  }
};

const playTic = () => {
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
    gameBoard.append(cell);
    cell.addEventListener("click", makeMove);
  }
  scoreBoard.innerHTML = `
  <h3>ScoreBoard</h3>
  <div>
  <div>Player Wins: ${playerWins}</div>
  <div>Computer Wins: ${computerWins}</div>
  <div>Ties: ${ties}</div></div>`;
  const clearButton = document.createElement("button");
  clearButton.innerText = "Reset";
  clearButton.addEventListener("click", () => {
    playTic();
  });
  gameSection.append(
    gameTitle,
    scoreBoard,
    displayTurn,
    gameBoard,
    backButton,
    clearButton
  );
};
