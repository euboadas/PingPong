import { CONFIG } from "./config.js";

export class Ball {
  constructor() {
    this.reset();
  }

  reset(direction = Math.random() < 0.5 ? -1 : 1) {
    this.x = CONFIG.canvasWidth / 2;
    this.y = CONFIG.canvasHeight / 2;
    this.radius = CONFIG.ballRadius;
    this.speed = CONFIG.ballSpeed;
    this.vx = direction * this.speed;
    this.vy = (Math.random() * 2 - 1) * this.speed * 0.6;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y - this.radius <= 0) {
      this.y = this.radius;
      this.vy *= -1;
    }

    if (this.y + this.radius >= CONFIG.canvasHeight) {
      this.y = CONFIG.canvasHeight - this.radius;
      this.vy *= -1;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f5f8ff";
    ctx.fill();
    ctx.closePath();
  }
}
