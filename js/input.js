const keys = new Set();

export function initInput() {
  window.addEventListener("keydown", (event) => {
    keys.add(event.code);
  });

  window.addEventListener("keyup", (event) => {
    keys.delete(event.code);
  });
}

export function isKeyDown(code) {
  return keys.has(code);
}

export function clearInput() {
  keys.clear();
}
