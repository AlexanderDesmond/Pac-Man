// Types of Tiles
const TYPES = ["BARRIER", "BISCUIT", "OPEN", "CHERRY", "GHOST", "PACMAN"];

const HALF_SIZE = SIZE / 2;
const THIRD_SIZE = SIZE / 3;
const QUARTER_SIZE = SIZE / 4;

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
        stroke(0);
        strokeWeight(5);
        fill("#0000FF");
        rect(this.x * SIZE, this.y * SIZE, SIZE, SIZE);
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
        noStroke();
        fill("#FF0000");
        ellipse(
          this.x * SIZE + QUARTER_SIZE,
          this.y * SIZE + QUARTER_SIZE,
          HALF_SIZE,
          HALF_SIZE
        );
        ellipseMode(CORNER);
        break;

      case "GHOST":
        break;

      case "PACMAN":
        stroke("#FFFF00");
        strokeWeight(5);
        fill("#FFFF33");
        ellipse(
          this.x * SIZE + QUARTER_SIZE,
          this.y * SIZE + QUARTER_SIZE,
          HALF_SIZE,
          HALF_SIZE
        );
        ellipseMode(CORNER);
        break;
    }
  }
}

/*
function parseType(t) {
  switch (t) {
    case "0":
      return "BARRIER";
    case "1":
      return "OPEN";
    case "2":
      return "BISCUIT";
    case "3":
      return "CHERRY";
  }
}
*/
