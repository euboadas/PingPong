import { CONFIG, MODES } from "./config.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
import { checkGoal, checkPaddleCollision } from "./collision.js";
import { Score } from "./score.js";
import { updateCpuPaddle } from "./cpu.js";
import { isKeyDown, clearInput } from "./input.js";

export class Game {
  constructor(canvas, elements, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.elements = elements;
    this.onGameOver = onGameOver;

    this.mode = null;
    this.running = false;
    this.animationId = null;

    this.ball = new Ball();
    this.leftPaddle = new Paddle(24, "left");
    this.rightPaddle = new Paddle(
      CONFIG.canvasWidth - CONFIG.paddleWidth - 24,
      "right"
    );

    this.score = new Score((left, right) => {
      this.elements.score.textContent = `${left} — ${right}`;
    });
  }

  start(mode) {
    this.mode = mode;
    this.running = true;
    this.resetMatch(false);
    this.updateModeLabel();
    this.loop();
  }

  stop() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    clearInput();
  }

  resetMatch(showServe = true) {
    this.score.reset();
    this.ball.reset();
    this.leftPaddle.reset();
    this.rightPaddle.reset();

    if (showServe) {
      this.showOverlay("Saque", "Presiona R para reiniciar la partida.");
      setTimeout(() => this.hideOverlay(), 900);
    }
  }

  resetRound() {
    const direction = this.ball.vx > 0 ? -1 : 1;
    this.ball.reset(direction);
    this.leftPaddle.reset();
    this.rightPaddle.reset();
  }

  updateModeLabel() {
    const label =
      this.mode === MODES.CPU ? "Modo: 1 jugador vs CPU" : "Modo: 2 jugadores";
    this.elements.modeLabel.textContent = label;

    this.elements.player2Controls.style.display =
      this.mode === MODES.CPU ? "none" : "block";
  }

  update() {
    if (!this.running) return;

    this.leftPaddle.handleInput();

    if (this.mode === MODES.MULTIPLAYER) {
      this.rightPaddle.handleInput();
    } else {
      updateCpuPaddle(this.rightPaddle, this.ball);
    }

    this.ball.update();

    checkPaddleCollision(this.ball, this.leftPaddle);
    checkPaddleCollision(this.ball, this.rightPaddle);

    const goal = checkGoal(this.ball);
    if (goal) {
      const winner = this.score.addPoint(goal);

      if (winner) {
        this.running = false;
        const winnerName =
          winner === "left"
            ? this.mode === MODES.CPU
              ? "Jugador"
              : "Jugador 1"
            : this.mode === MODES.CPU
              ? "CPU"
              : "Jugador 2";

        this.showOverlay("Fin del juego", `${winnerName} gana la partida.`);
        if (this.onGameOver) {
          this.onGameOver(winnerName);
        }
        return;
      }

      this.resetRound();
    }
  }

  draw() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "#2b3957";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    this.leftPaddle.draw(ctx);
    this.rightPaddle.draw(ctx);
    this.ball.draw(ctx);
  }

  loop() {
    this.update();
    this.draw();

    if (this.running) {
      this.animationId = requestAnimationFrame(() => this.loop());
    }
  }

  handleKeyDown(code) {
    if (code === "KeyR") {
      this.running = true;
      this.hideOverlay();
      this.resetMatch(false);
      this.loop();
    }

    if (code === "Escape") {
      this.stop();
      if (this.elements.onBackToMenu) {
        this.elements.onBackToMenu();
      }
    }
  }

  showOverlay(title, message) {
    this.elements.overlayTitle.textContent = title;
    this.elements.overlayMessage.textContent = message;
    this.elements.overlay.classList.remove("hidden");
  }

  hideOverlay() {
    this.elements.overlay.classList.add("hidden");
  }
}
