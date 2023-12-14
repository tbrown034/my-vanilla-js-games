import { showSection, hideSection, goBack } from "../script.js";

const gameSection = document.getElementById("game-section");
const introSection = document.getElementById("intro-section");

// main functions
export const loadRock = () => {
  gameSection.innerHTML = "";
  showSection(gameSection);
  hideSection(introSection);
  const gameTitle = document.createElement("h1");
  gameTitle.innerText = "Rock Paper Scissors";
  const gameSubtitle = document.createElement("h3");
  gameSubtitle.innerText =
    "Rock Paper Scissors is a hand game usually played between two people, where each player simultaneously forms one of three shapes with an outstretched hand. The possible shapes - rock (a fist), paper (a flat hand), and scissors (a fist with the index and middle fingers extended, forming a V) - have a simple set of rules for which shape defeats which.";
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
