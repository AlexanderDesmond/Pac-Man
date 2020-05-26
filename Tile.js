// Types of Tiles
const TYPES = ["BARRIER", "OPEN", "BISCUIT", "CHERRY", "GHOST", "PACMAN"];

const THIRD_SIZE = SIZE / 3;

// Class for Tile
class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;

    this.type = type;
  }

  draw() {
    switch (this.type) {
      case "BARRIER":
        strokeWeight(5);
        stroke(0);
        fill("#0000FF");
        rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
        break;
      case "OPEN":
        break;
      case "BISCUIT":
        noStroke();
        fill(255);
        ellipse(
          this.x * SIZE + THIRD_SIZE,
          this.y * SIZE + THIRD_SIZE,
          THIRD_SIZE,
          THIRD_SIZE
        );
        ellipseMode(CORNER);
        break;
      case "CHERRY":
        break;
      case "GHOST":
        break;
      case "PACMAN":
        break;
    }
  }
}
