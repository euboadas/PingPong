import { CONFIG } from "./config.js";

export function updateCpuPaddle(paddle, ball) {
  const paddleCenter = paddle.y + paddle.height / 2;
  const diff = ball.y - paddleCenter;

  if (Math.abs(diff) < CONFIG.cpuReactionZone) {
    return;
  }

  if (diff < 0) {
    paddle.y = Math.max(0, paddle.y - CONFIG.cpuSpeed);
  } else {
    paddle.y = Math.min(
      CONFIG.canvasHeight - paddle.height,
      paddle.y + CONFIG.cpuSpeed
    );
  }
}
