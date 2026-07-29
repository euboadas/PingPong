import { MODES } from "./config.js";
import { initInput, clearInput } from "./input.js";
import { Game } from "./game.js";

const menu = document.getElementById("menu");
const gameContainer = document.getElementById("game-container");
const canvas = document.getElementById("game-canvas");
const scoreEl = document.getElementById("score");
const modeLabel = document.getElementById("mode-label");
const player2Controls = document.getElementById("player2-controls");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");

const btnCpu = document.getElementById("btn-cpu");
const btnMultiplayer = document.getElementById("btn-multiplayer");
const btnBack = document.getElementById("btn-back");

let game = null;

function showMenu() {
  menu.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  overlay.classList.add("hidden");

  if (game) {
    game.stop();
  }
}

function showGame(mode) {
  menu.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  overlay.classList.add("hidden");
  clearInput();

  if (!game) {
    game = new Game(canvas, {
      score: scoreEl,
      modeLabel,
      player2Controls,
      overlay,
      overlayTitle,
      overlayMessage,
      onBackToMenu: showMenu,
    });
  }

  game.start(mode);
}

function init() {
  initInput();

  btnCpu.addEventListener("click", () => showGame(MODES.CPU));
  btnMultiplayer.addEventListener("click", () => showGame(MODES.MULTIPLAYER));
  btnBack.addEventListener("click", showMenu);

  window.addEventListener("keydown", (event) => {
    if (!game || gameContainer.classList.contains("hidden")) return;
    game.handleKeyDown(event.code);
  });
}

init();
