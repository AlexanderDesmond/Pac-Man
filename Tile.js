// Types of Tiles
const TYPES = ["BARRIER", "OPEN", "BISCUIT", "CHERRY", "GHOST", "PACMAN"];

// Class for Tile
class Tile {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;

    this.type = type;
  }

  draw() {
    console.log(SIZE);

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
