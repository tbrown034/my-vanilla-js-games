import { showSection, hideSection, goBack } from "../script.js";

const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

const backButton = document.createElement("button");
backButton.innerText = "Main Menu";
const turnMessage = document.createElement("div");
turnMessage.classList.add("turn-message");
const scoreBoard = document.createElement("div");
scoreBoard.id = "connect-scoreboard";
const gameBoard = document.createElement("div");
gameBoard.id = "connect-gameboard";
const gameTitle = document.createElement("h1");
gameTitle.innerText = "Connect Four";

let playerWins = 0;
let computerWins = 0;
let ties = 0;
let playerTurn = true;
let endgame = false;

export const loadConnect = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const photoDiv = document.createElement("div");
  photoDiv.classList.add("photo-div");
  const gameImage = document.createElement("img");
  gameImage.src = "assets/photos/vanilla-connect.png"; // Set the source to the image path
  gameImage.alt = "Description of the image"; // Always good to have an alt text
  photoDiv.appendChild(gameImage);

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
  gameSection.append(gameTitle, gameSubtitle, buttonDiv, photoDiv);
  console.log("Connect Four loaded.");
};

const playConnect = () => {
  endgame = false;
  playerTurn = true;
  gameSection.innerHTML = "";
  gameBoard.innerHTML = "";
  scoreBoard.innerHTML = `
        <h3>ScoreBoard</h3>
        <div id="scoreboard-info">
            <div>Player Wins: ${playerWins}</div>
            <div>Computer Wins: ${computerWins}</div>
            <div>Ties: ${ties}</div>
        </div>`;
  const clearButton = document.createElement("button");
  clearButton.innerText = "Play Again";
  clearButton.addEventListener("click", () => {
    playConnect();
  });
  for (let c = 0; c < 7; c++) {
    const column = document.createElement("div");
    column.classList.add("connect-col");
    column.id = `Col-${c}`;
    column.addEventListener("click", makeMove);
    for (let r = 0; r < 6; r++) {
      const cell = document.createElement("div");
      cell.classList.add("connect-cell");
      cell.id = `${c}-${r}`;
      column.append(cell);
    }
    gameBoard.append(column);
  }
  turnMessage.innerHTML = "It is now your turn.";
  const newButtonDiv = document.createElement("div");
  newButtonDiv.append(backButton, clearButton);
  newButtonDiv.classList.add("button-container");
  gameSection.append(
    gameTitle,
    scoreBoard,
    newButtonDiv,
    turnMessage,
    gameBoard
  );
  console.log("New game started.");
};

const makeMove = (e) => {
  if (endgame) {
    console.log("Game has ended, no more moves allowed.");
    return;
  }
  if (!playerTurn) {
    return;
  }
  let selectedCell = e.target.id;
  let selectedCol = selectedCell.split("-")[0];
  for (let r = 5; r >= 0; r--) {
    let cellId = `${selectedCol}-${r}`;
    let cell = document.getElementById(cellId);
    if (cell && !cell.classList.contains("occupied")) {
      cell.classList.add("occupied", "player-occupied");
      break;
    }
  }
  if (checkWin()) {
    displayWinner("player");
  } else {
    switchTurn();
    if (!playerTurn) {
      setTimeout(computerMove, 500);
    }
  }
};

const computerMove = () => {
  if (endgame) {
    console.log("Game has ended, no more moves allowed.");
    return;
  }
  let validMove = false;
  let randomCol;
  while (!validMove) {
    randomCol = Math.floor(Math.random() * 7);
    if (
      !document.getElementById(`${randomCol}-0`).classList.contains("occupied")
    ) {
      validMove = true;
    }
  }
  for (let r = 5; r >= 0; r--) {
    let cellId = `${randomCol}-${r}`;
    let cell = document.getElementById(cellId);
    if (cell && !cell.classList.contains("occupied")) {
      cell.classList.add("occupied", "computer-occupied");
      break;
    }
  }
  if (checkWin()) {
    displayWinner("computer");
  } else {
    switchTurn();
  }
};

const switchTurn = () => {
  playerTurn = !playerTurn;
  console.log("Switching turn. Player turn:", playerTurn);
  turnMessage.innerText = playerTurn
    ? "It is now your turn."
    : "Computer's turn.";
};

const checkWin = () => {
  if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) {
    endgame = true;
    console.log("Win detected. Endgame:", endgame);
    displayWinner(playerTurn ? "player" : "computer");
    return true;
  }
  return false;
};

const checkHorizontalWin = () => {
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (isConsecutiveFour(c, r, 1, 0)) {
        console.log("Horizontal win detected.");
        return true;
      }
    }
  }
  return false;
};

const checkVerticalWin = () => {
  for (let c = 0; c < 7; c++) {
    for (let r = 0; r < 3; r++) {
      if (isConsecutiveFour(c, r, 0, 1)) {
        console.log("Vertical win detected.");
        return true;
      }
    }
  }
  return false;
};

const checkDiagonalWin = () => {
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      if (isConsecutiveFour(c, r, 1, 1) || isConsecutiveFour(c, r, 1, -1)) {
        console.log("Diagonal win detected.");
        return true;
      }
    }
  }
  return false;
};

const isConsecutiveFour = (startCol, startRow, stepCol, stepRow) => {
  let firstCell = document.getElementById(`${startCol}-${startRow}`);
  if (!firstCell || !firstCell.classList.contains("occupied")) {
    return false;
  }
  let occupiedBy = firstCell.classList.contains("player-occupied")
    ? "player-occupied"
    : "computer-occupied";
  for (let i = 1; i < 4; i++) {
    let nextCell = document.getElementById(
      `${startCol + stepCol * i}-${startRow + stepRow * i}`
    );
    if (!nextCell || !nextCell.classList.contains(occupiedBy)) {
      return false;
    }
  }
  return true;
};

const displayWinner = (winner) => {
  let winnerMessage;
  if (winner === "tie") {
    ties++;
    winnerMessage = "It's a tie!";
  } else {
    winnerMessage =
      winner === "player"
        ? "Congratulations! You win!"
        : "Computer wins. Try again!";
    if (winner === "player") {
      playerWins++;
    } else {
      computerWins++;
    }
  }
  updateScoreBoard();
  turnMessage.innerHTML = winnerMessage;
  disableColumns();
  console.log(winnerMessage);
};

const disableColumns = () => {
  for (let c = 0; c < 7; c++) {
    const column = document.getElementById(`Col-${c}`);
    column.removeEventListener("click", makeMove);
  }
  console.log("Columns disabled");
};

const updateScoreBoard = () => {
  const scoreInfo = document.getElementById("scoreboard-info");
  if (scoreInfo) {
    scoreInfo.innerHTML = `
            <div>Player Wins: ${playerWins}</div>
            <div>Computer Wins: ${computerWins}</div>
            <div>Ties: ${ties}</div>
        `;
  }
};
