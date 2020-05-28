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
    this.moving = false;
    this.exists = true;
    this.destination = (-1, -1);
    this.speed = 0.1;
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
        stroke(0);
        strokeWeight(1);
        fill("#FF00EE");
        beginShape();
        vertex(this.x * SIZE + HALF_SIZE, this.y * SIZE + QUARTER_SIZE);
        vertex(this.x * SIZE + QUARTER_SIZE, this.y * SIZE + QUARTER_SIZE * 3);
        vertex(
          this.x * SIZE + QUARTER_SIZE * 3,
          this.y * SIZE + QUARTER_SIZE * 3
        );
        endShape(CLOSE);
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

  update() {
    // If this tile does not exist, there is nothing to do.
    if (!this.exists) return;

    /* Handle Movement */
    if (this.moving) {
      // Linear interpolation between current location and destination vectors.
      this.x = lerp(this.x, this.destination.x, this.speed);
      this.y = lerp(this.y, this.destination.y, this.speed);

      // Calculate the distance.
      let distanceX = Math.abs(this.x - this.destination.x);
      let distanceY = Math.abs(this.y - this.destination.y);

      // Check if the distance has been covered.
      if (distanceX < 0.1 && distanceY < 0.1) {
        this.x = this.destination.x;
        this.y = this.destination.y;

        // Destination reached, no longer moving.
        this.moving = false;
      }
    }

    /* Handle eating */
    // Only Pac-Man can eat biscuits and cherries.
    if (this.type === "PACMAN") {
      // Pac-Man's destination tile
      let destinationTile = getTile(Math.floor(this.x), Math.floor(this.y));

      // Ensure the destination tile exists.
      if (destinationTile.exists) {
        // When Pac-Man eats a biscuit or cherry, increase the score and have the food be 'eaten'.
        switch (destinationTile.type) {
          case "BISCUIT":
            score++;
            destinationTile.exists = false;
            break;
          case "CHERRY":
            score += 10;
            destinationTile.exists = false;
            break;

          case "GHOST":
            endGame(false);
            break;
        }
      }
    }
  }

  move(x, y, relative) {
    // x and y coordinates of destination tile.
    let destinationX, destinationY;

    if (relative) {
      destinationX = this.x + x;
      destinationY = this.y + y;
    } else {
      destinationX = x;
      destinationY = y;
    }

    // If already moving, it cannot move again until next ypdate.
    if (this.moving) return false;

    // Get the destination tile.
    let destinationTile = getTile(destinationX, destinationY);
    let type = destinationTile.type;

    // Prevents Pac-Man and Ghosts from colliding into barriers and Ghosts colliding into each other.
    if (
      (type === "BARRIER" && this.type !== "BARRIER") ||
      (type === "GHOST" && this.type === "GHOST")
    ) {
      return false;
    }

    // Begin movement next update.
    this.moving = true;
    this.destination = createVector(destinationX, destinationY);

    return true;
  }
}

// Get a specific tile from its x and y coordinates.
function getTile(x, y) {
  return field[y * DIMENSIONS + x];
}
