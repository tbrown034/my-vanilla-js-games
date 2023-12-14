import { showSection, hideSection, goBack } from "../script.js";

const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// main functions
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
  const backButton = document.createElement("button");
  backButton.innerText = "Go Back";
  backButton.addEventListener("click", goBack);
  const playNow = document.createElement("button");
  playNow.innerText = "Play Now";
  buttonDiv.append(playNow, backButton);
  gameSection.append(gameTitle, gameSubtitle, buttonDiv);
  console.log("here at connect");
};
