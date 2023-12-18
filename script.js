import { loadTic } from "./js/tic.js";
import { loadConnect } from "./js/connect.js";
import { loadRock } from "./js/rock.js";
import { loadHead } from "./js/head.js";

// DOM Elements
const introSection = document.getElementById("intro-section");
const gameSection = document.getElementById("game-section");
const ticButton = document.getElementById("tic-button");
const rockButton = document.getElementById("rock-button");
const connectButton = document.getElementById("connect-button");
const headButton = document.getElementById("head-button");
// helper functions
export const goBack = () => {
  hideSection(gameSection);
  showSection(introSection);
};
export const showSection = (section) => {
  section.classList.remove("hide");
  section.classList.add("display");
};
export const hideSection = (section) => {
  section.classList.add("hide");
  section.classList.remove("display");
};

// main functions
const selectGameClick = (gameType) => {
  hideSection(introSection);
  showSection(gameSection);
  switch (gameType) {
    case "tic":
      loadTic();
      break;
    case "rock":
      loadRock();
      break;
    case "head":
      loadHead();
      break;
    case "connect":
      loadConnect();
      break;
    default:
      alert("Error loading game");
  }
};

// Event Listeners
ticButton.addEventListener("click", () => selectGameClick("tic"));
rockButton.addEventListener("click", () => selectGameClick("rock"));
connectButton.addEventListener("click", () => selectGameClick("connect"));
headButton.addEventListener("click", () => selectGameClick("head"));
