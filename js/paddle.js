import { CONFIG } from "./config.js";
import { isKeyDown } from "./input.js";

export class Paddle {
  constructor(x, side) {
    this.x = x;
    this.y = CONFIG.canvasHeight / 2 - CONFIG.paddleHeight / 2;
    this.width = CONFIG.paddleWidth;
    this.height = CONFIG.paddleHeight;
    this.speed = CONFIG.paddleSpeed;
    this.side = side;
  }

  reset() {
    this.y = CONFIG.canvasHeight / 2 - CONFIG.paddleHeight / 2;
  }

  moveUp() {
    this.y = Math.max(0, this.y - this.speed);
  }

  moveDown() {
    this.y = Math.min(CONFIG.canvasHeight - this.height, this.y + this.speed);
  }

  handleInput() {
    if (this.side === "left") {
      if (isKeyDown("KeyW")) this.moveUp();
      if (isKeyDown("KeyS")) this.moveDown();
      return;
    }

    if (isKeyDown("ArrowUp")) this.moveUp();
    if (isKeyDown("ArrowDown")) this.moveDown();
  }

  draw(ctx) {
    ctx.fillStyle = this.side === "left" ? "#4f8cff" : "#34c38f";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
