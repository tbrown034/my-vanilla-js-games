import { showSection, hideSection, goBack } from "../script.js";

const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// main functions
export const loadTic = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const gameTitle = document.createElement("h1");
  gameTitle.innerText = "Tic Tac Toe";
  const gameSubtitle = document.createElement("h3");
  gameSubtitle.innerText =
    "Tic Tac Toe is a simple two-player game where players alternate marking spaces in a 3x3 grid with their respective symbols (commonly X and O). The winner is the first player to place three of their marks in a horizontal, vertical, or diagonal row.";
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("button-container");
  const backButton = document.createElement("button");
  backButton.innerText = "Go Back";
  backButton.addEventListener("click", goBack);
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
  console.log("here at tic");
};
