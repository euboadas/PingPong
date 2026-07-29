import { CONFIG } from "./config.js";

export class Score {
  constructor(onUpdate) {
    this.left = 0;
    this.right = 0;
    this.onUpdate = onUpdate;
  }

  reset() {
    this.left = 0;
    this.right = 0;
    this.notify();
  }

  addPoint(side) {
    if (side === "left") {
      this.left += 1;
    } else {
      this.right += 1;
    }

    this.notify();
    return this.getWinner();
  }

  getWinner() {
    if (this.left >= CONFIG.winningScore) return "left";
    if (this.right >= CONFIG.winningScore) return "right";
    return null;
  }

  notify() {
    if (this.onUpdate) {
      this.onUpdate(this.left, this.right);
    }
  }
}
