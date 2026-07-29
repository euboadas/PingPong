import { CONFIG } from "./config.js";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function checkPaddleCollision(ball, paddle) {
  const withinX =
    ball.x + ball.radius >= paddle.x &&
    ball.x - ball.radius <= paddle.x + paddle.width;

  const withinY =
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height;

  if (!withinX || !withinY) {
    return false;
  }

  const paddleCenter = paddle.y + paddle.height / 2;
  const relativeIntersect = (ball.y - paddleCenter) / (paddle.height / 2);
  const bounceAngle = relativeIntersect * (Math.PI / 3);
  const direction = paddle.side === "left" ? 1 : -1;

  ball.speed = Math.min(ball.speed + 0.15, 10);
  ball.vx = direction * ball.speed * Math.cos(bounceAngle);
  ball.vy = ball.speed * Math.sin(bounceAngle);

  if (paddle.side === "left") {
    ball.x = paddle.x + paddle.width + ball.radius;
  } else {
    ball.x = paddle.x - ball.radius;
  }

  return true;
}

export function checkGoal(ball) {
  if (ball.x - ball.radius < 0) {
    return "right";
  }

  if (ball.x + ball.radius > CONFIG.canvasWidth) {
    return "left";
  }

  return null;
}

export function keepBallInBounds(ball) {
  ball.y = clamp(ball.y, ball.radius, CONFIG.canvasHeight - ball.radius);
}
