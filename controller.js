export function initController({ getDirection, setDirection, width }) {
  let lastDirection = width;

  function controller(e) {
    const currentDirection = getDirection();

    if (e.keyCode === 37) { // left
      if (lastDirection !== 1) {
        setDirection(-1);
      }
    }
    else if (e.keyCode === 38) { // up
      if (lastDirection !== width) {
        setDirection(-width);
      }
    }
    else if (e.keyCode === 39) { // right
      if (lastDirection !== -1) {
        setDirection(1);
      }
    }
    else if (e.keyCode === 40) { // down
      if (lastDirection !== -width) {
        setDirection(width);
      }
    }

    lastDirection = getDirection();
  }

  document.addEventListener('keydown', controller);
}